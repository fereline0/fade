import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { PressEvent, ValidationErrors } from "@react-types/shared";
import { VariantProps } from "@heroui/theme";
import { Input } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";
import { Checkbox } from "@heroui/checkbox";
import { DateValue } from "@internationalized/date";
import { ImHammer2 } from "react-icons/im";
import { Granularity } from "@react-types/datepicker/src/index";
import { Dispatch, SetStateAction } from "react";

type TBanFormProps = {
  onSubmit: (e: PressEvent) => void;
  reason: string;
  setReason: Dispatch<SetStateAction<string>>;
  expires: DateValue | null;
  setExpires: Dispatch<SetStateAction<DateValue | null>>;
  activity: boolean;
  setActivity: Dispatch<SetStateAction<boolean>>;
  validationErrors?: ValidationErrors;
  isLoading?: boolean;
  isDisabled?: boolean;
  expiresGranularity?: Granularity;
  submitButtonProps?: Omit<
    VariantProps<typeof Button>,
    "onPress" | "isLoading" | "isDisabled"
  >;
};

export default function BanForm({
  onSubmit,
  reason,
  setReason,
  expires,
  setExpires,
  activity,
  setActivity,
  isLoading,
  validationErrors,
  isDisabled,
  expiresGranularity,
  submitButtonProps = {
    children: <ImHammer2 size={22} />,
    color: "danger",
    isIconOnly: true,
  },
}: TBanFormProps) {
  return (
    <Form validationErrors={validationErrors}>
      <Input
        name="reason"
        value={reason}
        onValueChange={setReason}
        label="Reason"
      />
      <DatePicker
        name="expires"
        label="Expires"
        granularity={expiresGranularity}
        value={expires}
        onChange={setExpires}
      />
      <Checkbox
        name="activity"
        color="danger"
        isSelected={activity}
        onValueChange={setActivity}
      >
        Activity
      </Checkbox>
      <Button
        onPress={onSubmit}
        isLoading={isLoading}
        isDisabled={isDisabled}
        {...submitButtonProps}
      />
    </Form>
  );
}
