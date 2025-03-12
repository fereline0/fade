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
import {
  MdDeleteOutline,
  MdModeEditOutline,
  MdOutlineReply,
} from "react-icons/md";
import Actions from "@/app/_components/Actions";
import { TComment } from "@/app/_types/comment";
import { deleteComment } from "../actions";
import { Dispatch, SetStateAction } from "react";
import { DropdownItem } from "@heroui/dropdown";
import { VariantProps } from "@heroui/theme";
import {
  canCreateComment,
  canDeleteComment,
  canUpdateComment,
} from "../policies";

type TCommentActionsProps = {
  comment: TComment;
  setCommentForEdit: Dispatch<SetStateAction<TComment | null>>;
  setCommentParent: Dispatch<SetStateAction<TComment | null>>;
};

export default function CommentActions({
  comment,
  setCommentForEdit,
  setCommentParent,
}: TCommentActionsProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session } = useSession();
  const router = useRouter();
  const { isPending, execute } = useServerAction(deleteComment);

  const writerId = comment.writerId;
  const writerRolePosition = comment.writer?.role?.position || Infinity;
  const authedUser = session?.user;
  const authedUserId = authedUser?.id || "";
  const authedUserRolePosition = authedUser?.role?.position || -Infinity;
  const authedUserAbilities = authedUser?.role?.abilities || [];
  const authedUserBans = authedUser?.bans || [];

  const onReply = () => {
    setCommentParent(comment);
  };

  const onUpdate = () => {
    setCommentParent(comment.parent || null);
    setCommentForEdit(comment);
  };

  const onDelete = async () => {
    await execute({ id: comment.id, writerId, writerRolePosition });
    router.refresh();
  };

  const replyIsDisabled = !authedUser || !canCreateComment(authedUserBans);
  const updateIsDisabled =
    !authedUser ||
    !canUpdateComment(
      writerId,
      writerRolePosition,
      authedUserId,
      authedUserRolePosition,
      authedUserAbilities,
      authedUserBans,
    );
  const deleteIsDisabled =
    !authedUser ||
    !canDeleteComment(
      writerId,
      writerRolePosition,
      authedUserId,
      authedUserRolePosition,
      authedUserAbilities,
      authedUserBans,
    );

  const actions: VariantProps<typeof DropdownItem>[] = [
    {
      key: "reply",
      startContent: <MdOutlineReply size={22} />,
      children: "Reply",
      onPress: onReply,
      isDisabled: replyIsDisabled,
    },
    {
      key: "update",
      startContent: <MdModeEditOutline size={22} />,
      children: "Update",
      onPress: onUpdate,
      isDisabled: updateIsDisabled,
    },
    {
      key: "delete",
      startContent: <MdDeleteOutline size={22} />,
      children: "Delete",
      onPress: onOpen,
      isDisabled: deleteIsDisabled,
    },
  ];

  return (
    <>
      <Actions actions={actions} />
      {!deleteIsDisabled && (
        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Are you sure you want to delete this comment?
            </ModalHeader>
            <ModalBody>
              This action is irreversible! The comment will be permanently
              deleted from the database!
            </ModalBody>
            <ModalFooter>
              <Button onPress={onDelete} color="danger" isLoading={isPending}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
