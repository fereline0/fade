import { TAbility } from "@/app/_types/ability";
import { TBan } from "@/app/_types/ban";
import { can, findActiveBan } from "@/app/_utils/user";

export const canCreateBan = (
  userRolePosition: number,
  authedUserRolePosition: number,
  authedUserAbilities: TAbility[],
  authedUserBans: TBan[],
) =>
  !findActiveBan(authedUserBans) &&
  can(authedUserAbilities, "createBan") &&
  userRolePosition < authedUserRolePosition;

export const canUpdateBan = (
  userRolePosition: number,
  authedUserRolePosition: number,
  authedUserAbilities: TAbility[],
  authedUserBans: TBan[],
) =>
  !findActiveBan(authedUserBans) &&
  can(authedUserAbilities, "updateBan") &&
  userRolePosition < authedUserRolePosition;

export const canDeleteBan = (
  userRolePosition: number,
  authedUserRolePosition: number,
  authedUserAbilities: TAbility[],
  authedUserBans: TBan[],
) =>
  !findActiveBan(authedUserBans) &&
  can(authedUserAbilities, "deleteBan") &&
  userRolePosition < authedUserRolePosition;
