import { Link } from "@heroui/link";
import { Dispatch, SetStateAction } from "react";
import { TComment } from "@/app/_types/comment";
import Comment from "@/app/_components/Comment";
import CommentPreview from "@/app/_components/CommentPreview";
import CommentActions from "./CommentActions";

type TCommentWrapperProps = {
  comment: TComment;
  setCommentForEdit: Dispatch<SetStateAction<TComment | null>>;
  setCommentParent: Dispatch<SetStateAction<TComment | null>>;
};

export default function CommentWrapper({
  comment,
  setCommentForEdit,
  setCommentParent,
}: TCommentWrapperProps) {
  if (!comment.writer) {
    return null;
  }

  return (
    <Comment
      key={comment.id}
      startHeaderContent={
        comment.parent?.writer?.name && (
          <CommentPreview
            name={comment.parent.writer.name}
            value={comment.parent.value}
          />
        )
      }
      avatarProps={{ src: comment.writer.image ?? undefined }}
      name={
        <Link href={`/users/${comment.writer.id}`}>{comment.writer.name}</Link>
      }
      userEndContent={
        <CommentActions
          comment={comment}
          setCommentForEdit={setCommentForEdit}
          setCommentParent={setCommentParent}
        />
      }
      description={comment.formattedCreatedAt}
      value={comment.value}
    />
  );
}
