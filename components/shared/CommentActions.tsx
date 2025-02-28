import {
  MdDeleteOutline,
  MdModeEditOutline,
  MdOutlineReply,
} from "react-icons/md";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { VariantProps } from "@heroui/theme";
import { IoMdMore } from "react-icons/io";
import { TCommand } from "@/types/command";

type TCommentActionsProps = {
  replyCommand?: TCommand;
  editCommand?: TCommand;
  deleteCommand?: TCommand;
};

export default function CommentActions({
  replyCommand,
  editCommand,
  deleteCommand,
}: TCommentActionsProps) {
  const actions: VariantProps<typeof DropdownItem>[] = [
    {
      key: "reply",
      startContent: <MdOutlineReply size={22} />,
      children: "Reply",
      onPress: replyCommand?.onPress,
      isDisabled: replyCommand?.isDisabled,
    },
    {
      key: "edit",
      startContent: <MdModeEditOutline size={22} />,
      children: "Edit",
      onPress: editCommand?.onPress,
      isDisabled: editCommand?.isDisabled,
    },
    {
      key: "delete",
      startContent: <MdDeleteOutline size={22} />,
      children: "Delete",
      onPress: deleteCommand?.onPress,
      isDisabled: deleteCommand?.isDisabled,
    },
  ];

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button isIconOnly variant="light">
          <IoMdMore size={22} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        items={actions.filter(
          (action) => action.isDisabled != null && !action.isDisabled,
        )}
      >
        {({ key, isDisabled, ...action }) => (
          <DropdownItem key={key} {...action} />
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
