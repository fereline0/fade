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

type TUserCommentProps = {
  comment: TComment;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setCommentForEdit: React.Dispatch<React.SetStateAction<TComment | null>>;
  setCommentParent: React.Dispatch<React.SetStateAction<TComment | null>>;
};

export default function UserComment({
  comment,
  setValue,
  setCommentForEdit,
  setCommentParent,
}: TUserCommentProps) {
  const router = useRouter();

  const {
    isOpen: isOpenSignOut,
    onOpen: onOpenSignOut,
    onOpenChange: onOpenChangeSignOut,
  } = useDisclosure();

  const { isPending, execute } = useServerAction(deleteComment);

  const onReply = () => {
    setCommentParent(comment);
  };

  const onEdit = () => {
    comment.parent ? setCommentParent(comment.parent) : null;
    setCommentForEdit(comment);
    setValue(comment.value);
  };

  const onDelete = async () => {
    await execute({
      id: comment.id,
    });

    router.refresh();
  };

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
          <CommentActions
            replyCommand={{ onPress: onReply, isDisabled: false }}
            editCommand={{ onPress: onEdit, isDisabled: false }}
            deleteCommand={{ onPress: onOpenSignOut, isDisabled: false }}
          />
        }
        description={formatDistance(comment.createdAt, new Date(), {
          addSuffix: true,
        })}
        value={comment.value}
      />
      <Modal
        backdrop="blur"
        isOpen={isOpenSignOut}
        onOpenChange={onOpenChangeSignOut}
      >
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
