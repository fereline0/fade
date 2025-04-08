import { notFound } from "next/navigation";
import RoleUpdate from "./_components/RoleUpdate";
import { prisma } from "@/app/_utils/prisma";
import { auth } from "@/auth";
import { canUpdateRole } from "../../policies";

type TRoleUpdatePageProps = {
  params: Promise<{
    roleId: string;
  }>;
};

export default async function RoleUpdatePage({ params }: TRoleUpdatePageProps) {
  const [{ roleId }, session] = await Promise.all([params, auth()]);

  try {
    const [abilities, role] = await prisma.$transaction([
      prisma.ability.findMany(),
      prisma.role.findUniqueOrThrow({
        where: {
          id: roleId,
        },
        include: {
          abilities: true,
        },
      }),
    ]);

    const authedUser = session?.user;
    const authedUserRole = authedUser?.role;

    if (
      !canUpdateRole(
        authedUser?.bans || [],
        authedUserRole?.abilities || [],
        authedUserRole?.position!,
        role.position,
      )
    ) {
      notFound();
    }

    return <RoleUpdate abilities={abilities} role={role} />;
  } catch {
    notFound();
  }
}
