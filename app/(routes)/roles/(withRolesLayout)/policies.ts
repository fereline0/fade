import { TAbility } from "@/app/_types/ability";
import { TBan } from "@/app/_types/ban";
import { TRole } from "@/app/_types/role";
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

export const canUpdateRole = (
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

export const canUpdateRoles = (
  authedUserBans: TBan[],
  authedUserRoleAbilities: TAbility[],
  authedUserRolePosition: number,
  roles: TRole[],
) => {
  if (findActiveBan(authedUserBans)) {
    return false;
  }

  if (!can(authedUserRoleAbilities, "updateRole")) {
    return false;
  }

  roles.forEach((role) => {
    if (authedUserRolePosition >= role.position) {
      return false;
    }
  });

  return true;
};
