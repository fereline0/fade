import { TAbility } from "@/app/_types/ability";
import { TBan } from "@/app/_types/ban";
import { can, findActiveBan } from "@/app/_utils/user";

export const canCreateRole = (
  authedUserBans: TBan[],
  authedUserRoleAbilities: TAbility[],
) => {
  if (findActiveBan(authedUserBans)) {
    return false;
  }

  if (!can(authedUserRoleAbilities, "createRole")) {
    return false;
  }

  return true;
};

export const canUpdateRolesPositions = (
  authedUserBans: TBan[],
  authedUserRoleAbilities: TAbility[],
  authedUserRolePosition: number,
  rolePosition: number,
) => {
  if (findActiveBan(authedUserBans)) {
    return false;
  }

  if (!can(authedUserRoleAbilities, "updateRole")) {
    return false;
  }

  if (authedUserRolePosition >= rolePosition) {
    return false;
  }

  return true;
};
