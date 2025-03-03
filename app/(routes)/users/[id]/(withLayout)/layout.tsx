import { ReactNode } from "react";
import User from "./_components/User";
import { prisma } from "@/app/_utils/prisma";
import { notFound } from "next/navigation";

type TUserLayoutProps = {
  params: {
    id: string;
  };
  children: ReactNode;
};

export default async function UserLayout({
  params,
  children,
}: TUserLayoutProps) {
  const { id } = params;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      role: true,
      bans: true,
    },
  });

  if (!user) {
    return notFound();
  }

  return <User user={user}>{children}</User>;
}
