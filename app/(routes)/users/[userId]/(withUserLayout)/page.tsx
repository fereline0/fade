import { prisma } from "@/app/_utils/prisma";
import { notFound } from "next/navigation";
import Comments from "./_components/Comments";
import { formatDistance } from "date-fns";
import { TComment } from "@/app/_types/comment";

type TCommentsPageProps = {
  params: Promise<{
    userId: string;
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
  const { userId } = await params;
  const { page = "1", limit = "20" } = await searchParams;

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);
  const pageToSkip = (parsedPage - 1) * parsedLimit;

  try {
    const [comments, count] = await prisma.$transaction([
      prisma.comment.findMany({
        where: {
          userId,
        },
        skip: pageToSkip,
        take: parsedLimit,
        include: {
          writer: {
            include: {
              role: true,
            },
          },
          parent: {
            include: {
              writer: true,
            },
          },
        },
      }),
      prisma.comment.count({
        where: {
          userId,
        },
      }),
    ]);

    const now = new Date();
    const formattedComments: TComment[] = comments.map((comment) => ({
      ...comment,
      formattedCreatedAt: formatDistance(comment.createdAt, now, {
        addSuffix: true,
      }),
    }));

    return (
      <Comments
        userId={userId}
        comments={formattedComments}
        total={count}
        limit={parsedLimit}
      />
    );
  } catch (error) {
    notFound();
  }
}
