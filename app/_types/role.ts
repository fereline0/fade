import { TAbility } from "./ability";

export type TRole = {
  id: string;
  name: string;
  position: number;
  abilities?: TAbility[] | null;
  createdAt: Date;
  updatedAt: Date;
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
};
