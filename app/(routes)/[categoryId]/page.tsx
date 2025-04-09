import { notFound } from "next/navigation";
import Categories from "../_components/Categories";
import { formatDistance } from "date-fns";
import { TArticle } from "@/app/_types/article";
import { prisma } from "@/app/_utils/prisma";

type TCategoryPageProps = {
  params: Promise<{
    categoryId: string;
  }>;
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
};

export default async function CategoryPage({
  params,
  searchParams,
}: TCategoryPageProps) {
  const [{ categoryId }, { page = 1, limit = 20 }] = await Promise.all([
    params,
    searchParams,
  ]);

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);
  const pageToSkip = (parsedPage - 1) * parsedLimit;

  try {
    const [categories, articles, count] = await prisma.$transaction([
      prisma.category.findMany({
        where: {
          parentId: categoryId,
        },
      }),
      prisma.article.findMany({
        where: {
          categoryId,
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
          categoryId,
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
