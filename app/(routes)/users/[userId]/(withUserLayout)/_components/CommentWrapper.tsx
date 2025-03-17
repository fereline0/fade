"use client";

import { Link } from "@heroui/link";
import { Dispatch, SetStateAction } from "react";
import { TComment } from "@/app/_types/comment";
import Message from "@/app/_components/shared/Message";
import MessagePreview from "@/app/_components/shared/MessagePreview";
import CommentActions from "./CommentActions";

type TCommentWrapperProps = {
  comment: TComment;
  setCommentForEdit: Dispatch<SetStateAction<TComment | null>>;
  setCommentParent: Dispatch<SetStateAction<TComment | null>>;
};

export default function CommentWrapper({
  comment,
  comment: { parent, writer },
  setCommentForEdit,
  setCommentParent,
}: TCommentWrapperProps) {
  if (!writer) return null;

  return (
    <Message
      startHeaderContent={
        parent?.writer?.name && (
          <MessagePreview name={parent.writer.name} value={parent.value} />
        )
      }
      avatarProps={{ src: writer.image ?? undefined }}
      name={<Link href={`/users/${writer.id}`}>{writer.name}</Link>}
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
