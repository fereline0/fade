import { prisma } from "@/app/_utils/prisma";
import UserComments from "./_components/UserComments";
import { notFound } from "next/navigation";

export const revalidate = 0;

type TCommentsPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
};

export default async function CommentsPage({
  params,
  searchParams,
}: TCommentsPageProps) {
  const { id } = await params;
  const { page = "1", limit = "20" } = await searchParams;

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);
  const pageToSkip = (parsedPage - 1) * parsedLimit;

  try {
    const [comments, count] = await prisma.$transaction([
      prisma.comment.findMany({
        where: {
          userId: id,
        },
        skip: pageToSkip,
        take: parsedLimit,
        include: {
          writer: true,
          parent: {
            include: {
              writer: true,
            },
          },
        },
      }),
      prisma.comment.count({
        where: {
          userId: id,
        },
      }),
    ]);

    return (
      <UserComments
        userId={id}
        comments={comments}
        total={count}
        limit={parsedLimit}
      />
    );
  } catch (error) {
    notFound();
  }
}
