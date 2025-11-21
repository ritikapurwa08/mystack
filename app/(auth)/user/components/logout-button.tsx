"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
const LogOutButton = () => {
  const router = useRouter();
  const { signOut } = useAuthActions();
  const handleSignOut = async () => {
    await signOut().then(() => {
      router.push("/");
    });
  };
  return (
    <div>
      <Button onClick={handleSignOut} variant={"outline"}>
        Log Out
      </Button>
    </div>
  );
};

export default LogOutButton;
