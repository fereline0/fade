import { TAbility } from "@/app/_types/ability";
import { TBan } from "@/app/_types/ban";

export const can = (userAbilities: TAbility[], abilitySlug: string) =>
  userAbilities.some((ability) => ability.slug === abilitySlug);

export const findActiveBan = (bans: TBan[] | null): TBan | null =>
  bans?.find((ban) => new Date(ban.expires) > new Date() && ban.activity) ||
  null;
