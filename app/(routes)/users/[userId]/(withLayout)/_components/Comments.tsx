"use client";

import { useState } from "react";
import { TComment } from "@/app/_types/comment";
import Paginate from "@/app/_components/Paginate";
import { TPaginate } from "@/app/_types/paginate";
import CommentWrapper from "./CommentWrapper";
import CommentForm from "./CommentForm";

type TCommentsProps = TPaginate & {
  userId: string;
  comments: TComment[];
};

export default function Comments({
  userId,
  comments,
  total,
  limit,
}: TCommentsProps) {
  const [commentForEdit, setCommentForEdit] = useState<TComment | null>(null);
  const [commentParent, setCommentParent] = useState<TComment | null>(null);

  return (
    <div className="space-y-2">
      <CommentForm
        userId={userId}
        commentForEdit={commentForEdit}
        setCommentForEdit={setCommentForEdit}
        commentParent={commentParent}
        setCommentParent={setCommentParent}
      />
      {comments.map((comment) => (
        <CommentWrapper
          key={comment.id}
          comment={comment}
          setCommentForEdit={setCommentForEdit}
          setCommentParent={setCommentParent}
        />
      ))}
      <Paginate total={total} limit={limit} />
    </div>
  );
}
