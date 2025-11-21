import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export const UseGetCurrentUser = () => {
  const user = useQuery(api.users.getCurrentUser);
  return user;
};

export function UseCheckUserEmailExists(email: string | undefined) {
  const res = useQuery(api.users.checkEmailExists, email ? { email } : "skip");
  // res should be boolean | undefined
  return res;
}
