import { TAbility } from "@/app/_types/ability";
import { TBan } from "@/app/_types/ban";
import { can, findActiveBan } from "@/app/_utils/user";

export const canCreateBan = (
  userRolePosition: number,
  authedUserBans: TBan[],
  authedUserRolePosition: number,
  authedUserRoleAbilities: TAbility[],
) => {
  if (findActiveBan(authedUserBans)) {
    return false;
  }

  if (!can(authedUserRoleAbilities, "createBan")) {
    return false;
  }

  if (userRolePosition <= authedUserRolePosition) {
    return false;
  }

  return true;
};

export const canUpdateBan = (
  userRolePosition: number,
  authedUserBans: TBan[],
  authedUserRolePosition: number,
  authedUserRoleAbilities: TAbility[],
) => {
  if (findActiveBan(authedUserBans)) {
    return false;
  }

  if (!can(authedUserRoleAbilities, "updateBan")) {
    return false;
  }

  if (userRolePosition <= authedUserRolePosition) {
    return false;
  }

  return true;
};

export const canDeleteBan = (
  userRolePosition: number,
  authedUserBans: TBan[],
  authedUserRolePosition: number,
  authedUserRoleAbilities: TAbility[],
) => {
  if (findActiveBan(authedUserBans)) {
    return false;
  }

  if (!can(authedUserRoleAbilities, "deleteBan")) {
    return false;
  }

  if (userRolePosition <= authedUserRolePosition) {
    return false;
  }

  return true;
};
