"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import CustomFormField, {
  FormFieldType,
} from "@/components/form/custom_form_field";
import { EyeClosedIcon, MailCheck, MailIcon } from "lucide-react";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [error, setError] = useState("");

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    setError("");

    try {
      await signIn("password", {
        email: data.email,
        password: data.password,
        flow: "signIn",
      });

      router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const msg = (err?.message || "").toLowerCase();

      if (
        msg.includes("invalidsecret") ||
        msg.includes("invalid credentials") ||
        msg.includes("password")
      ) {
        setError("Incorrect email or password. Please try again.");
      } else if (msg.includes("account") && msg.includes("not found")) {
        setError("No account found with this email.");
      } else {
        setError("Failed to sign in. Please try again.");
      }
      console.error("Convex signIn error:", err);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-base">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                lucideIcon={MailIcon}
                label="Email"
                placeholder="you@example.com"
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="password"
                lucideIcon={EyeClosedIcon}
                label="Password"
                placeholder="••••••••"
              />

              <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="rememberMe"
                label="Remember me"
              />

              {error && (
                <div className="rounded-md bg-red-50 p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm text-muted-foreground">
            Don t have an account?{" "}
            <Link
              href="/signUp"
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
