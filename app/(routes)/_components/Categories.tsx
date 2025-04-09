import Paginate from "@/app/_components/shared/Paginate";
import { TArticle } from "@/app/_types/article";
import { TPaginate } from "@/app/_types/paginate";
import Container from "@/app/_components/shared/Container";
import ContainerSideBar from "@/app/_components/shared/ContainerSideBar";
import ContainerMain from "@/app/_components/shared/ContainerMain";
import { TCategory } from "@/app/_types/category";
import Category from "@/app/_components/shared/Category";
import ArticlePreviewWrapper from "./ArticlePreviewWrapper";
import { Link } from "@heroui/link";

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
    <Container>
      {categories.length > 0 && (
        <ContainerSideBar>
          <div className="space-y-2">
            {categories.map((category) => (
              <Category
                key={category.id}
                name={<Link href={`/${category.id}`}>{category.name}</Link>}
              />
            ))}
          </div>
        </ContainerSideBar>
      )}
      <ContainerMain>
        <div className="space-y-4">
          {articles.map((article) => (
            <ArticlePreviewWrapper key={article.id} article={article} />
          ))}
          <Paginate total={total} limit={limit} />
        </div>
      </ContainerMain>
    </Container>
  );
}
