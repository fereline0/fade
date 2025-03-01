import { can } from "./user";
import { TAbility } from "@/types/ability";

export const canEdit = (
  userId: string,
  writerId: string,
  userAbilities: TAbility[],
) => {
  return userId === writerId || can(userAbilities, "editComment");
};

export const canDelete = (
  userId: string,
  writerId: string,
  userAbilities: TAbility[],
) => {
  return userId === writerId || can(userAbilities, "deleteComment");
};
