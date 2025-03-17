import { Textarea } from "@heroui/input";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { PressEvent, ValidationErrors } from "@react-types/shared";
import { VariantProps } from "@heroui/theme";
import { Dispatch, SetStateAction } from "react";

type TCommentFormProps = {
  onSubmit: (e: PressEvent) => void;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  validationErrors?: ValidationErrors;
  isLoading?: boolean;
  isDisabled?: boolean;
  submitButtonProps?: Omit<
    VariantProps<typeof Button>,
    "onPress" | "isLoading" | "isDisabled"
  >;
};

export default function CommentForm({
  onSubmit,
  value,
  setValue,
  validationErrors,
  isLoading,
  isDisabled,
  submitButtonProps,
}: TCommentFormProps) {
  return (
    <Form validationErrors={validationErrors}>
      <Textarea
        name="value"
        isDisabled={isDisabled}
        value={value}
        onValueChange={setValue}
        label="Comment"
      />
      <Button
        onPress={onSubmit}
        isLoading={isLoading}
        isDisabled={isDisabled}
        {...submitButtonProps}
      />
    </Form>
  );
}
