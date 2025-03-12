import { TAbility } from "@/app/_types/ability";
import { TBan } from "@/app/_types/ban";
import { can, findActiveBan } from "@/app/_utils/user";

export const canCreateComment = (bans: TBan[]) => !findActiveBan(bans);

export const canUpdateComment = (
  writerId: string,
  authedUserId: string,
  authedUserAbilities: TAbility[],
  authedUserBans: TBan[],
) =>
  !findActiveBan(authedUserBans) &&
  (writerId === authedUserId || can(authedUserAbilities, "updateComment"));

export const canDeleteComment = (
  writerId: string,
  authedUserId: string,
  authedUserAbilities: TAbility[],
  authedUserBans: TBan[],
) =>
  !findActiveBan(authedUserBans) &&
  (writerId === authedUserId || can(authedUserAbilities, "deleteComment"));
