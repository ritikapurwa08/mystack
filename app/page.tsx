
"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      hlo
      <p>user name</p>
      <Button asChild>
        <Link href="signUp">Sign Up</Link>
      </Button>
      <Button asChild>
        <Link href="signIn">Sign In</Link>
      </Button>
      <Button asChild>
        <Link href="/signout">this is the</Link>
      </Button>
      <div>
      </div>
    </div>
  );
};

export default Page;
