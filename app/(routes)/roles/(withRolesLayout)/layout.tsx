import { ReactNode } from "react";
import { prisma } from "@/app/_utils/prisma";
import { notFound } from "next/navigation";
import Roles from "./_components/Roles";

type TRolesLayoutProps = {
  children: ReactNode;
};

export default async function UserLayout({ children }: TRolesLayoutProps) {
  try {
    const roles = await prisma.role.findMany({
      include: {
        abilities: true,
      },
      orderBy: {
        position: "asc",
      },
    });

    return <Roles roles={roles}>{children}</Roles>;
  } catch (error) {
    notFound();
  }
}
