import { PressEvent } from "@react-types/shared";

export type TCommand = {
  onPress: (e: PressEvent) => void;
  isDisabled: boolean;
};
