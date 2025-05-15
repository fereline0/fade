import { prisma } from "@/app/_utils/prisma";
import { notFound } from "next/navigation";
import Categories from "../_components/Categories";
import { TArticle } from "@/app/_types/article";
import { formatDistance } from "date-fns";

type TCategoriesPageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
};

export default async function CategoriesPage({
  searchParams,
}: TCategoriesPageProps) {
  const { page = "1", limit = "20" } = await searchParams;

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);
  const pageToSkip = (parsedPage - 1) * parsedLimit;

  try {
    const [categories, articles, count] = await prisma.$transaction([
      prisma.category.findMany({
        where: {
          parentId: null,
        },
      }),
      prisma.article.findMany({
        where: {
          published: true,
        },
        include: {
          user: true,
          comments: {
            include: {
              writer: true,
            },
            take: 1,
            orderBy: {
              createdAt: "desc",
            },
          },
        },
        take: parsedLimit,
        skip: pageToSkip,
      }),
      prisma.article.count({
        where: {
          published: true,
        },
      }),
    ]);

    const now = new Date();
    const formatedArticles: TArticle[] = articles.map((article) => {
      const formattedArticleDate = formatDistance(article.createdAt, now, {
        addSuffix: true,
      });

      const formattedComments = article.comments.map((comment) => ({
        ...comment,
        formattedCreatedAt: formatDistance(comment.createdAt, now, {
          addSuffix: true,
        }),
      }));

      return {
        ...article,
        formattedCreatedAt: formattedArticleDate,
        comments: formattedComments,
      };
    });

    return (
      <Categories
        categories={categories}
        articles={formatedArticles}
        total={count}
        limit={parsedLimit}
      />
    );
  } catch {
    notFound();
  }
}
