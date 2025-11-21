import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      hlo
      <p>user name</p>
      <Button>
        <Link href="signUp">Sign Up</Link>
      </Button>
      <Button>
        <Link href="signIn">Sign In</Link>
      </Button>
    </div>
  );
};

export default page;
