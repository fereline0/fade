import { prisma } from "@/app/_utils/prisma";
import { notFound } from "next/navigation";
import { getRandomHEXColor } from "@/app/_utils/color";
import RolesCreate from "./_components/RolesCreate";
import { auth } from "@/auth";
import { canCreateRole } from "../policies";

export default async function RolesCreatePage() {
  try {
    const [abilities, session] = await Promise.all([
      prisma.ability.findMany(),
      auth(),
    ]);

    const authedUser = session?.user;

    const randomHEXColor = getRandomHEXColor();

    if (
      !canCreateRole(authedUser?.bans || [], authedUser?.role?.abilities || [])
    ) {
      notFound();
    }

    return (
      <RolesCreate abilities={abilities} randomHEXColor={randomHEXColor} />
    );
  } catch (error) {
    notFound();
  }
}
