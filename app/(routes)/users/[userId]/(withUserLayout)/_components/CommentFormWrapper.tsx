import { Card, CardBody } from "@heroui/card";
import { useServerAction } from "zsa-react";
import { MdModeEditOutline, MdOutlineReply, MdSend } from "react-icons/md";
import { createComment, updateComment } from "../actions";
import MessagePreview from "@/app/_components/shared/MessagePreview";
import { TComment } from "@/app/_types/comment";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { IoMdCheckmark } from "react-icons/io";
import { canCreateComment, canUpdateComment } from "../policies";
import CommentForm from "@/app/_components/shared/CommentForm";

type TCommentFormWrapperProps = {
  userId: string;
  commentForEdit: TComment | null;
  setCommentForEdit: Dispatch<SetStateAction<TComment | null>>;
  commentParent: TComment | null;
  setCommentParent: Dispatch<SetStateAction<TComment | null>>;
};

export default function CommentFormWrapper({
  userId,
  commentForEdit,
  setCommentForEdit,
  commentParent,
  setCommentParent,
}: TCommentFormWrapperProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [value, setValue] = useState("");

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

  const authedUser = session?.user;
  const authedUserId = authedUser?.id;
  const authedUserBans = authedUser?.bans || [];
  const commentParentId = commentParent?.id || null;
  const commentForEditWriterId = commentForEdit?.writerId;
  const commentForEditWriterRolePosition =
    commentForEdit?.writer?.role?.position!;

  const clearForm = () => {
    setValue("");
    setCommentForEdit(null);
    setCommentParent(null);
  };

  const onSubmit = async () => {
    if (commentForEdit) {
      await executeUpdate({
        id: commentForEdit.id,
        value,
        published: true,
        parentId: commentParentId,
        writerId: commentForEditWriterId,
        writerRolePosition: commentForEditWriterRolePosition,
      });
    } else {
      await executeCreate({
        value,
        userId,
        published: true,
        writerId: authedUserId!,
        parentId: commentParentId,
      });
    }

    router.refresh();
  };

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      clearForm();
    }
  }, [isCreateSuccess, isUpdateSuccess]);

  useEffect(() => {
    if (commentForEdit) {
      setValue(commentForEdit.value);
    } else {
      setValue("");
    }
  }, [commentForEdit]);

  const isDisabled =
    !authedUser ||
    (commentForEdit
      ? !canUpdateComment(
          commentForEditWriterId!,
          commentForEditWriterRolePosition,
          authedUserId!,
          authedUserBans,
          authedUser?.role?.position!,
          authedUser?.role?.abilities!,
        )
      : !canCreateComment(authedUserBans));

  return (
    <Card>
      <CardBody>
        <div className="space-y-4">
          {commentForEdit && commentForEdit.writer?.name && (
            <MessagePreview
              name={commentForEdit.writer.name}
              value={commentForEdit.value}
              startContent={<MdModeEditOutline size={22} />}
              fullWidth
              isPressable
              onPress={clearForm}
            />
          )}
          {commentParent && commentParent.writer?.name && (
            <MessagePreview
              name={commentParent.writer.name}
              value={commentParent.value}
              startContent={<MdOutlineReply size={22} />}
              fullWidth
              isPressable
              onPress={() => setCommentParent(null)}
            />
          )}
          <CommentForm
            onSubmit={onSubmit}
            value={value}
            setValue={setValue}
            validationErrors={
              commentForEdit
                ? updateError?.fieldErrors
                : createError?.fieldErrors
            }
            isLoading={isCreatePending || isUpdatePending}
            isDisabled={isDisabled}
            submitButtonProps={{
              color: "primary",
              isIconOnly: true,
              children: commentForEdit ? (
                <IoMdCheckmark size={22} />
              ) : (
                <MdSend size={22} />
              ),
            }}
          />
        </div>
      </CardBody>
    </Card>
  );
}
