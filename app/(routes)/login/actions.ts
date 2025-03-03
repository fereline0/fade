"use server";

import { signIn, signOut } from "@/auth";
import { BuiltInProviderType } from "next-auth/providers";

export const login = async <
  P extends BuiltInProviderType | (string & {}),
  R extends boolean = true,
>(
  provider?: P,
  options?:
    | FormData
    | ({
        redirectTo?: string;
        redirect?: R;
      } & Record<string, any>),
  authorizationParams?:
    | string[][]
    | Record<string, string>
    | string
    | URLSearchParams,
) => {
  return await signIn(provider, options, authorizationParams);
};

export const logOut = async <R extends boolean = true>(options?: {
  redirectTo?: string;
  redirect?: R;
}) => {
  return await signOut(options);
};
