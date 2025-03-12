import { TUser } from "./user";

export type TBan = {
  id: string;
  userId: string;
  user?: TUser | null;
  reason: string | null;
  activity: boolean;
  expires: Date;
  formattedExpires?: string;
  initiatorId: string;
  initiator?: TUser | null;
  createdAt: Date;
  updatedAt: Date;
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
};
