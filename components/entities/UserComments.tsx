"use client";

import { useSession } from "next-auth/react";
import { Card, CardBody } from "@heroui/card";
import CommentForm from "../shared/CommentForm";
import UserComment from "./UserComment";
import { TUser } from "@/types/user";
import { useEffect, useState } from "react";
import { TComment } from "@/types/comment";
import { useServerAction } from "zsa-react";
import { createComment, updateComment } from "@/actions/comment";
import { useRouter } from "next/navigation";
import CommentPreview from "../shared/CommentPreview";
import { MdModeEditOutline, MdOutlineReply } from "react-icons/md";

type TUserCommentsProps = {
  user: TUser;
};

export default function UserComments({ user }: TUserCommentsProps) {
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
      });
    } else {
      await executeCreate({
        value: value,
        userId: user.id,
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
      {status === "authenticated" && (
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
      )}
      {user.comments?.map((comment) => (
        <UserComment
          key={comment.id}
          comment={comment}
          setValue={setValue}
          setCommentForEdit={setCommentForEdit}
          setCommentParent={setCommentParent}
        />
      ))}
    </div>
  );
}
