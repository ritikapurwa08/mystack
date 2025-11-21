import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

import { DataModel } from "./_generated/dataModel";
import { ConvexError } from "convex/values";
import { z } from "zod";

const ParamsSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

const CustomPassword = Password<DataModel>({
  profile(params) {
    const result = ParamsSchema.safeParse(params);
    if (!result.success) {
      throw new ConvexError({ message: "Invalid email format." });
    }
    return {
      email: result.data.email,
      name: result.data.name,
    };
  },
});

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [CustomPassword, GitHub, Google],
});
