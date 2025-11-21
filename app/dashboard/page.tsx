"use client";
import React from "react";
import { UseGetCurrentUser } from "../(auth)/user/api/user-query";
import LogOutButton from "../(auth)/user/components/logout-button";

const page = () => {
  const user = UseGetCurrentUser();

  return (
    <div>
      <div>{user ? user.name : "Loading..."}</div>

      <LogOutButton />
    </div>
  );
};

export default page;
