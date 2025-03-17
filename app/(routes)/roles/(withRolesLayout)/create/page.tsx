import { prisma } from "@/app/_utils/prisma";
import { notFound } from "next/navigation";
import { getRandomHEXColor } from "@/app/_utils/color";
import RolesCreate from "./_components/RolesCreate";

export default async function RolesCreatePage() {
  try {
    const abilities = await prisma.ability.findMany();
    const randomHEXColor = getRandomHEXColor();

    return (
      <RolesCreate abilities={abilities} randomHEXColor={randomHEXColor} />
    );
  } catch (error) {
    notFound();
  }
}
