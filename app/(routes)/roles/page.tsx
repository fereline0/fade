import { prisma } from "@/app/_utils/prisma";
import Roles from "./_components/Roles";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function RolesPage() {
  try {
    const roles = await prisma.role.findMany({
      include: {
        abilities: true,
      },
      orderBy: {
        position: "asc",
      },
    });

    return <Roles roles={roles} />;
  } catch (error) {
    notFound();
  }
}
