import ArticlePreview from "@/app/_components/shared/ArticlePreview";
import { TArticle } from "@/app/_types/article";
import { Link } from "@heroui/link";

type TArticlePreviewWrapperProps = {
  article: TArticle;
};

export default function ArticlePreviewWrapper({
  article,
}: TArticlePreviewWrapperProps) {
  const latestComment = article.comments?.[0];
  const commentWriter = latestComment?.writer;
  const commentDate = latestComment?.formattedCreatedAt;
  const articleFormattedCreatedAt = article.formattedCreatedAt;
  const avatarSrc = (commentWriter?.image || article.user?.image) ?? undefined;
  const responderId = commentWriter?.id || article.user?.id;
  const responderName = commentWriter?.name || article.user?.name;
  const responderDescription = commentDate || articleFormattedCreatedAt;

  if (!article.user) {
    return null;
  }

  return (
    <ArticlePreview
      key={article.id}
      title={article.title}
      description={
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <Link href={`/users/${article.user.id}`}>{article.user.name}</Link>
          <span>·</span>
          <p>{articleFormattedCreatedAt}</p>
        </div>
      }
      responderName={
        <Link href={`/users/${responderId}`}>{responderName}</Link>
      }
      responderAvatarProps={{
        src: avatarSrc,
      }}
      responderDescription={responderDescription}
    />
  );
}
