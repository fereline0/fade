import { TArticle } from "./article";

export type TCategory = {
  id: string;
  name: string;
  parentId?: string | null;
  parent?: TCategory | null;
  childs?: TCategory[];
  articles?: TArticle[];
  createdAt: Date;
  updatedAt: Date;
};
