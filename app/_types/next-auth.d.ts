import { DefaultSession } from "next-auth";
import { TRole } from "./role";
import { TBan } from "./ban";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: TRole | null;
      bans: TBan[] | null;
    } & DefaultSession["user"];
  }
}
