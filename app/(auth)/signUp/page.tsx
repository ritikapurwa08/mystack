"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { UseCheckUserEmailExists } from "../user/api/user-query";
import CustomFormField, {
  FormFieldType,
} from "@/components/form/custom_form_field";

const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [error, setError] = useState("");

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const emailValue = form.watch("email");
  const emailExists = UseCheckUserEmailExists(emailValue || undefined);

  // Optionally clear global error when email changes
  useEffect(() => {
    if (error) setError("");
  }, [emailValue, error]);

  const onSubmit = async (data: SignUpFormValues) => {
    setError("");

    // 1) Front-end + Convex check before signIn
    if (emailExists) {
      setError("This email is already in use. Please sign in instead.");
      return;
    }

    try {
      // 2) Still call Convex Auth signUp (backend will enforce uniqueness)
      await signIn("password", {
        name: data.name,
        email: data.email,
        password: data.password,
        flow: "signUp",
      });

      router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const msg = err?.message || "";
      if (msg.toLowerCase().includes("already exists")) {
        setError("This email is already in use. Please sign in instead.");
      } else {
        setError("Failed to create account. Please try again.");
      }
      console.error("Convex signUp error:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-purple-50 via-pink-50 to-rose-50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <h1 className="mb-2 text-center text-2xl font-bold">Create Account</h1>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Enter your information to get started
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              label="Full Name"
              placeholder="John Doe"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email"
              placeholder="you@example.com"
            />

            {/* Inline email-exists message */}
            {emailValue && emailExists && (
              <p className="text-sm text-red-500">
                This email is already in use. Try another or sign in.
              </p>
            )}

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="password"
              label="Password"
              placeholder="••••••••"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="••••••••"
            />

            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="terms"
              label="I agree to the terms and conditions"
            />

            {error && (
              <div className="rounded-md bg-red-50 p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={
                form.formState.isSubmitting || emailExists === undefined
              }
            >
              {form.formState.isSubmitting ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
