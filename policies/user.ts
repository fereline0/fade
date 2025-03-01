import { TAbility } from "@/types/ability";

export const can = (
  userAbilities: TAbility[],
  abilitySlug: string,
): boolean => {
  return userAbilities.some((ability) => ability.slug === abilitySlug);
};
