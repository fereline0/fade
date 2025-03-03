import { TBan } from "./ban";
import { TComment } from "./comment";
import { TRole } from "./role";

export type TUser = {
  id: string;
  name: string | null;
  email: string;
  emailVerified?: Date | null;
  image: string | null;
  comments?: TComment[] | null;
  writedComments?: TComment[] | null;
  roleId: string | null;
  role?: TRole | null;
  bans?: TBan[] | null;
  createdAt: Date;
  updatedAt: Date;
};
