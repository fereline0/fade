import { TComment } from "@/types/comment";
import Comment from "../shared/Comment";
import { Link } from "@heroui/link";
import CommentActions from "../shared/CommentActions";
import { formatDistance } from "date-fns";
import CommentPreview from "../shared/CommentPreview";
import { useServerAction } from "zsa-react";
import { deleteComment } from "@/actions/comment";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { useSession } from "next-auth/react";
import { canDelete, canEdit } from "@/policies/comment";
import { Dispatch, SetStateAction } from "react";

type TUserCommentProps = {
  comment: TComment;
  setValue: Dispatch<SetStateAction<string>>;
  setCommentForEdit: Dispatch<SetStateAction<TComment | null>>;
  setCommentParent: Dispatch<SetStateAction<TComment | null>>;
};

export default function UserComment({
  comment,
  setValue,
  setCommentForEdit,
  setCommentParent,
}: TUserCommentProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isPending, execute } = useServerAction(deleteComment);

  const onReply = () => {
    setCommentParent(comment);
  };

  const onEdit = () => {
    if (comment.parent) {
      setCommentParent(comment.parent);
    }
    setCommentForEdit(comment);
    setValue(comment.value);
  };

  const onDelete = async () => {
    await execute({ id: comment.id, writerId: comment.writerId });
    router.refresh();
  };

  const isUserLoggedIn = status === "authenticated";
  const userId = session?.user?.id || "";
  const userAbilities = session?.user?.role?.abilities || [];

  const replyIsDisabled = !isUserLoggedIn;
  const editIsDisabled =
    !isUserLoggedIn || !canEdit(userId, comment.writerId, userAbilities);
  const deleteIsDisabled =
    !isUserLoggedIn || !canDelete(userId, comment.writerId, userAbilities);

  const isAnyActionDisabled =
    replyIsDisabled && editIsDisabled && deleteIsDisabled;

  if (!comment.writer) {
    return null;
  }

  return (
    <>
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
          <Link href={`/users/${comment.writer.id}`}>
            {comment.writer.name}
          </Link>
        }
        userEndContent={
          !isAnyActionDisabled && (
            <CommentActions
              replyCommand={{ onPress: onReply, isDisabled: replyIsDisabled }}
              editCommand={{ onPress: onEdit, isDisabled: editIsDisabled }}
              deleteCommand={{ onPress: onOpen, isDisabled: deleteIsDisabled }}
            />
          )
        }
        description={formatDistance(comment.createdAt, new Date(), {
          addSuffix: true,
        })}
        value={comment.value}
      />
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Are you sure you want to delete this comment?
          </ModalHeader>
          <ModalBody>
            This action is irreversible; the comment will be permanently deleted
            from the database!
          </ModalBody>
          <ModalFooter>
            <Button onPress={onDelete} color="danger" isLoading={isPending}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
