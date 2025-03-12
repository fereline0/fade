import { TAbility } from "@/app/_types/ability";
import { TBan } from "@/app/_types/ban";
import { can, findActiveBan } from "@/app/_utils/user";

export const canCreateBan = (
  authedUserAbilities: TAbility[],
  authedUserBans: TBan[],
) => !findActiveBan(authedUserBans) && can(authedUserAbilities, "createBan");

export const canUpdateBan = (
  authedUserAbilities: TAbility[],
  authedUserBans: TBan[],
) => !findActiveBan(authedUserBans) && can(authedUserAbilities, "updateBan");

export const canDeleteBan = (
  authedUserAbilities: TAbility[],
  authedUserBans: TBan[],
) => !findActiveBan(authedUserBans) && can(authedUserAbilities, "deleteBan");
