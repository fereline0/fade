import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import Actions from "@/app/_components/Actions";
import { TBan } from "@/app/_types/ban";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { useServerAction } from "zsa-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@heroui/button";
import { DropdownItem } from "@heroui/dropdown";
import { VariantProps } from "@heroui/theme";
import { Dispatch, SetStateAction } from "react";
import { deleteBan } from "../actions";
import { canDeleteBan, canUpdateBan } from "../policies";

type TBanActionsProps = {
  ban: TBan;
  userRolePosition: number;
  setBanForEdit: Dispatch<SetStateAction<TBan | null>>;
};

export default function BanActions({
  ban,
  userRolePosition,
  setBanForEdit,
}: TBanActionsProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { isPending, execute } = useServerAction(deleteBan);

  const onUpdate = () => {
    setBanForEdit(ban);
  };

  const onDelete = async () => {
    await execute({ id: ban.id, userRolePosition });
    router.refresh();
  };

  const authedUser = session?.user;
  const authedUserRolePosition = authedUser?.role?.position || -Infinity;
  const authedUserAbilities = authedUser?.role?.abilities || [];
  const authedUserBans = authedUser?.bans || [];

  const updateIsDisabled =
    !authedUser ||
    !canUpdateBan(
      userRolePosition,
      authedUserRolePosition,
      authedUserAbilities,
      authedUserBans,
    );

  const deleteIsDisabled =
    !authedUser ||
    !canDeleteBan(
      userRolePosition,
      authedUserRolePosition,
      authedUserAbilities,
      authedUserBans,
    );

  const actions: VariantProps<typeof DropdownItem>[] = [
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
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Are you sure you want to delete this ban?
          </ModalHeader>
          <ModalBody>
            This action is irreversible! The ban will be permanently deleted
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
