import User from "@/components/pages/User";
import { prisma } from "@/utils/prisma";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      role: true,
      comments: {
        where: {
          published: true,
        },
        include: {
          writer: true,
          parent: {
            include: {
              writer: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return notFound();
  }

  return <User user={user} />;
}
