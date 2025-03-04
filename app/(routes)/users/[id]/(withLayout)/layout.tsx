import { ReactNode } from "react";
import User from "./_components/User";
import { prisma } from "@/app/_utils/prisma";
import { notFound } from "next/navigation";

type TUserLayoutProps = {
  params: Promise<{
    id: string;
  }>;
  children: ReactNode;
};

export default async function UserLayout({
  params,
  children,
}: TUserLayoutProps) {
  const { id } = await params;

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        role: true,
        bans: true,
      },
    });

    return <User user={user}>{children}</User>;
  } catch (error) {
    notFound();
  }
}
