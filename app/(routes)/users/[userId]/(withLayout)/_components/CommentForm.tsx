import { Card, CardBody } from "@heroui/card";
import { useServerAction } from "zsa-react";
import { MdModeEditOutline, MdOutlineReply, MdSend } from "react-icons/md";
import { createComment, updateComment } from "../actions";
import CommentPreview from "@/app/_components/CommentPreview";
import { TComment } from "@/app/_types/comment";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { IoMdCheckmark } from "react-icons/io";
import { canCreateComment } from "../policies";
import { Form } from "@heroui/form";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";

type TCommentFormProps = {
  userId: string;
  commentForEdit: TComment | null;
  setCommentForEdit: Dispatch<SetStateAction<TComment | null>>;
  commentParent: TComment | null;
  setCommentParent: Dispatch<SetStateAction<TComment | null>>;
};

export default function CommentForm({
  userId,
  commentForEdit,
  setCommentForEdit,
  commentParent,
  setCommentParent,
}: TCommentFormProps) {
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

  const clearForm = () => {
    setValue("");
    setCommentForEdit(null);
    setCommentParent(null);
  };

  const onPublish = async () => {
    if (!authedUser) return;

    if (commentForEdit) {
      await executeUpdate({
        id: commentForEdit.id,
        value,
        published: true,
        parentId: commentParent?.id ?? null,
        writerId: commentForEdit.writerId,
      });
    } else {
      await executeCreate({
        value,
        userId,
        published: true,
        writerId: authedUser.id,
        parentId: commentParent?.id ?? null,
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

  return (
    <Card>
      <CardBody>
        <div className="space-y-4">
          {commentForEdit && commentForEdit.writer?.name && (
            <CommentPreview
              name={commentForEdit.writer.name}
              value={commentForEdit.value}
              startContent={<MdModeEditOutline size={22} />}
              onPress={clearForm}
            />
          )}
          {commentParent && commentParent.writer?.name && (
            <CommentPreview
              name={commentParent.writer.name}
              value={commentParent.value}
              startContent={<MdOutlineReply size={22} />}
              onPress={() => setCommentParent(null)}
            />
          )}
          <Form
            validationErrors={
              commentForEdit
                ? updateError?.fieldErrors
                : createError?.fieldErrors
            }
          >
            <Textarea
              name="value"
              value={value}
              onValueChange={setValue}
              label="Comment"
            />

            <Button
              color="primary"
              isIconOnly
              onPress={onPublish}
              isLoading={isCreatePending || isUpdatePending}
              isDisabled={
                !authedUser || !canCreateComment(authedUser.bans || [])
              }
            >
              {commentForEdit ? (
                <IoMdCheckmark size={22} />
              ) : (
                <MdSend size={22} />
              )}
            </Button>
          </Form>
        </div>
      </CardBody>
    </Card>
  );
}
