"use client";

import { useSession } from "next-auth/react";
import { Card, CardBody } from "@heroui/card";
import UserComment from "./UserComment";
import { useEffect, useState } from "react";
import { useServerAction } from "zsa-react";
import { useRouter } from "next/navigation";
import { MdModeEditOutline, MdOutlineReply } from "react-icons/md";
import { TComment } from "@/app/_types/comment";
import { createComment, updateComment } from "../actions";
import Loading from "@/app/_components/Loading";
import CommentPreview from "@/app/_components/CommentPreview";
import CommentForm from "@/app/_components/CommentForm";
import { findActiveBan } from "@/app/_utils/user";
import Paginate from "@/app/_components/Paginate";
import { TPaginate } from "@/app/_types/paginate";

type TUserCommentsProps = TPaginate & {
  userId: string;
  comments: TComment[];
};

export default function UserComments({
  userId,
  comments,
  total,
  limit,
}: TUserCommentsProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [value, setValue] = useState("");
  const [commentForEdit, setCommentForEdit] = useState<TComment | null>(null);
  const [commentParent, setCommentParent] = useState<TComment | null>(null);

  const {
    isPending: isCreatePending,
    execute: executeCreate,
    isSuccess: isCreateSuccess,
    error: createError,
  } = useServerAction(createComment);

  const {
    isPending: isUpdatePending,
    execute: executeUpdate,
    isSuccess: isUpdateSuccess,
    error: updateError,
  } = useServerAction(updateComment);

  const clearCommentForEdit = () => {
    setCommentForEdit(null);
    setValue("");
    clearCommentParent();
  };

  const clearCommentParent = () => {
    setCommentParent(null);
  };

  const onPublish = async () => {
    if (commentForEdit) {
      await executeUpdate({
        id: commentForEdit.id,
        value: value,
        published: true,
        parentId: commentParent?.id,
        writerId: commentForEdit.writerId,
      });
    } else {
      await executeCreate({
        value: value,
        userId,
        published: true,
        writerId: session?.user?.id,
        parentId: commentParent?.id,
      });
    }

    router.refresh();
  };

  useEffect(() => {
    if ((isCreateSuccess || isUpdateSuccess) && !createError && !updateError) {
      setValue("");
      clearCommentForEdit();
      clearCommentParent();
    }
  }, [isCreateSuccess, isUpdateSuccess, createError, updateError]);

  return (
    <div className="space-y-2">
      {status === "loading" ? (
        <Loading />
      ) : (
        !findActiveBan(session?.user.bans || []) && (
          <Card>
            <CardBody>
              <div className="space-y-4">
                {commentForEdit && commentForEdit.writer?.name && (
                  <CommentPreview
                    name={commentForEdit.writer.name}
                    value={commentForEdit.value}
                    startContent={<MdModeEditOutline size={22} />}
                    onPress={clearCommentForEdit}
                  />
                )}
                {commentParent && commentParent.writer?.name && (
                  <CommentPreview
                    name={commentParent.writer.name}
                    value={commentParent.value}
                    startContent={<MdOutlineReply size={22} />}
                    onPress={clearCommentParent}
                  />
                )}
                <CommentForm
                  onPublish={onPublish}
                  value={value}
                  setValue={setValue}
                  isLoading={isCreatePending || isUpdatePending}
                  valueErrorMessage={
                    commentForEdit
                      ? updateError?.fieldErrors?.value
                      : createError?.fieldErrors?.value
                  }
                />
              </div>
            </CardBody>
          </Card>
        )
      )}
      {comments.map((comment) => (
        <UserComment
          key={comment.id}
          comment={comment}
          setValue={setValue}
          setCommentForEdit={setCommentForEdit}
          setCommentParent={setCommentParent}
        />
      ))}
      <Paginate total={total} limit={limit} />
    </div>
  );
}
