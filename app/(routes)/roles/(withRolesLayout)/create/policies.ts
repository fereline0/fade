import { TAbility } from "@/app/_types/ability";
import { TBan } from "@/app/_types/ban";
import { can, findActiveBan } from "@/app/_utils/user";

export const canUpdateRolesPositions = (
  authedUserRoleAbilities: TAbility[],
  authedUserBans: TBan[],
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
