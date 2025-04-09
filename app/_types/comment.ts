import { TArticle } from "./article";
import { TUser } from "./user";

export type TComment = {
  id: string;
  value: string;
  published: boolean;
  childs?: TComment[] | null;
  parentId: string | null;
  parent?: TComment | null;
  writerId: string;
  writer?: TUser | null;
  userId?: string | null;
  user?: TUser | null;
  articleId?: string | null;
  article?: TArticle | null;
  createdAt: Date;
  updatedAt: Date;
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
};
