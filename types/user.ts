import { TComment } from "./comment";

export type TUser = {
  id: string;
  name: string | null;
  email: string;
  emailVerified?: Date | null;
  image: string | null;
  comments?: TComment[] | null;
  writedComments?: TComment[] | null;
  createdAt: Date;
  updatedAt: Date;
};
