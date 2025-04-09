import { TComment } from "./comment";
import { TUser } from "./user";

export type TArticle = {
  id: string;
  title: string;
  value: string;
  comments?: TComment[];
  userId: string;
  user?: TUser;
  createdAt: Date;
  updatedAt: Date;
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
};
