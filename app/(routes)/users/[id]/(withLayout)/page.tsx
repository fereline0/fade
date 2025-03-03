import { prisma } from "@/app/_utils/prisma";
import { notFound } from "next/navigation";
import UserComments from "./_components/UserComments";

export const revalidate = 0;

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const comments = await prisma.comment.findMany({
    where: {
      userId: id,
    },
    include: {
      writer: true,
      parent: {
        include: {
          writer: true,
        },
      },
    },
  });

  if (!comments) {
    return notFound();
  }

  return <UserComments userId={id} comments={comments} />;
}
