import { getContrastHEXColor } from "@/app/_utils/color";
import { Button } from "@heroui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { VariantProps } from "@heroui/theme";
import { ReactNode } from "react";
import { MdOutlineColorize } from "react-icons/md";

type TColorPicker = {
  color: string;
  children: ReactNode;
  buttonProps?: VariantProps<typeof Button>;
};

export default function ColorPicker({
  color,
  children,
  buttonProps = {
    isIconOnly: true,
    children: (
      <MdOutlineColorize color={getContrastHEXColor(color)} size={22} />
    ),
    style: { backgroundColor: color },
  },
}: TColorPicker) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button {...buttonProps} />
      </PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  );
}
