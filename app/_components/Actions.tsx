import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { VariantProps } from "@heroui/theme";
import { IoMdMore } from "react-icons/io";

type TActionsProps = {
  actions: VariantProps<typeof DropdownItem>[];
  triggerButtonProps?: VariantProps<typeof Button>;
};

export default function Actions({
  actions,
  triggerButtonProps = {
    children: <IoMdMore size={22} />,
    variant: "light",
    isIconOnly: true,
  },
}: TActionsProps) {
  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button {...triggerButtonProps} />
      </DropdownTrigger>
      <DropdownMenu items={actions}>
        {({ key, ...action }) => <DropdownItem key={key} {...action} />}
      </DropdownMenu>
    </Dropdown>
  );
}
