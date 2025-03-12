import { TAbility } from "@/app/_types/ability";
import { TBan } from "@/app/_types/ban";
import { can, findActiveBan } from "@/app/_utils/user";

export const canUpdateRole = (
  authedUserAbilities: TAbility[],
  authedUserBans: TBan[],
  authedUserRolePosition: number,
  rolePosition: number,
) => {
  return (
    !findActiveBan(authedUserBans) &&
    can(authedUserAbilities, "updateRole") &&
    authedUserRolePosition > rolePosition
  );
};
