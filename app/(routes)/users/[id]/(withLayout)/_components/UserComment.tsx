import { Link } from "@heroui/link";
import { formatDistance } from "date-fns";
import { useServerAction } from "zsa-react";
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
import { Dispatch, SetStateAction } from "react";
import { TComment } from "@/app/_types/comment";
import { deleteComment } from "../actions";
import { can, findActiveBan } from "@/app/_utils/user";
import Comment from "@/app/_components/Comment";
import CommentPreview from "@/app/_components/CommentPreview";
import CommentActions from "@/app/_components/CommentActions";

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
  const { data: session } = useSession();
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

  const user = session?.user;
  const userAbilities = user?.role?.abilities || [];
  const userIsBanned = !!findActiveBan(user?.bans || []);
  const userWriteThisComment = user?.id === comment.writerId;

  const replyIsDisabled = userIsBanned;
  const editIsDisabled =
    userIsBanned ||
    !(userWriteThisComment || can(userAbilities, "editComment"));
  const deleteIsDisabled =
    userIsBanned ||
    !(userWriteThisComment || can(userAbilities, "deleteComment"));

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
