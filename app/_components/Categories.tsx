import Paginate from "@/app/_components/shared/Paginate";
import { TArticle } from "@/app/_types/article";
import { TPaginate } from "@/app/_types/paginate";
import { TCategory } from "@/app/_types/category";
import Category from "@/app/_components/shared/Category";
import ArticlePreviewWrapper from "./ArticlePreviewWrapper";
import { Link } from "@heroui/link";
import ColumnRowContainer from "@/app/_components/shared/ColumnRowContainer";
import ColumnRowContainerMain from "@/app/_components/shared/ColumnRowContainerMain";
import ColumnRowContainerSideBar from "@/app/_components/shared/ColumnRowContainerSideBar";

type TCategoriesProps = {
  categories: TCategory[];
  articles: TArticle[];
} & TPaginate;

export default function Categories({
  categories,
  articles,
  total,
  limit,
}: TCategoriesProps) {
  return (
    <ColumnRowContainer>
      {categories.length > 0 && (
        <ColumnRowContainerSideBar>
          <div className="space-y-2">
            {categories.map((category) => (
              <Category
                key={category.id}
                name={<Link href={`/${category.id}`}>{category.name}</Link>}
              />
            ))}
          </div>
        </ColumnRowContainerSideBar>
      )}
      <ColumnRowContainerMain>
        <div className="space-y-4">
          {articles.map((article) => (
            <ArticlePreviewWrapper key={article.id} article={article} />
          ))}
          <Paginate total={total} limit={limit} />
        </div>
      </ColumnRowContainerMain>
    </ColumnRowContainer>
  );
}
