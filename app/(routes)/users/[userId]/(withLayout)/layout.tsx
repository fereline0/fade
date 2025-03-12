import { ReactNode } from "react";
import { prisma } from "@/app/_utils/prisma";
import { notFound } from "next/navigation";
import User from "./_components/User";

type TUserLayoutProps = {
  params: Promise<{
    userId: string;
  }>;
  children: ReactNode;
};

export default async function UserLayout({
  params,
  children,
}: TUserLayoutProps) {
  const { userId } = await params;

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
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
