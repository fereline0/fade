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
  userId: string;
  user?: TUser | null;
  createdAt: Date;
  updatedAt: Date;
};
