import { TAbility } from "@/app/_types/ability";
import { TBan } from "@/app/_types/ban";
import { can, findActiveBan } from "@/app/_utils/user";

export const canCreateComment = (bans: TBan[]) => {
  if (findActiveBan(bans)) {
    return false;
  }
  return true;
};

export const canUpdateComment = (
  writerId: string,
  writerRolePosition: number,
  authedUserId: string,
  authedUserBans: TBan[],
  authedUserRolePosition: number,
  authedUserRoleAbilities: TAbility[],
) => {
  if (findActiveBan(authedUserBans)) {
    return false;
  }

  if (writerId === authedUserId) {
    return true;
  }

  if (!can(authedUserRoleAbilities, "updateComment")) {
    return false;
  }

  if (writerRolePosition < authedUserRolePosition) {
    return false;
  }

  return true;
};

export const canDeleteComment = (
  writerId: string,
  writerRolePosition: number,
  authedUserId: string,
  authedUserBans: TBan[],
  authedUserRolePosition: number,
  authedUserRoleAbilities: TAbility[],
) => {
  if (findActiveBan(authedUserBans)) {
    return false;
  }

  if (writerId === authedUserId) {
    return true;
  }

  if (!can(authedUserRoleAbilities, "deleteComment")) {
    return false;
  }

  if (writerRolePosition < authedUserRolePosition) {
    return false;
  }

  return true;
};
