import { TAbility } from "@/app/_types/ability";
import { TBan } from "@/app/_types/ban";
import { can, findActiveBan } from "@/app/_utils/user";

export const canCreateComment = (bans: TBan[]) => !findActiveBan(bans);

export const canUpdateComment = (
  writerId: string,
  writerRolePosition: number,
  authedUserId: string,
  authedUserRolePosition: number,
  authedUserAbilities: TAbility[],
  authedUserBans: TBan[],
) =>
  !findActiveBan(authedUserBans) &&
  (writerId === authedUserId ||
    (can(authedUserAbilities, "updateComment") &&
      writerRolePosition < authedUserRolePosition));

export const canDeleteComment = (
  writerId: string,
  writerRolePosition: number,
  authedUserId: string,
  authedUserRolePosition: number,
  authedUserAbilities: TAbility[],
  authedUserBans: TBan[],
) =>
  !findActiveBan(authedUserBans) &&
  (writerId === authedUserId ||
    (can(authedUserAbilities, "deleteComment") &&
      writerRolePosition < authedUserRolePosition));
