import { Textarea } from "@heroui/input";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { PressEvent, ValidationResult } from "@react-types/shared";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { MdSend } from "react-icons/md";

type TCommentFormProps = {
  onPublish: (e: PressEvent) => void;
  isLoading: boolean;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  valueErrorMessage?: ReactNode | ((v: ValidationResult) => ReactNode);
};

export default function CommentForm({
  onPublish,
  isLoading,
  value,
  setValue,
  valueErrorMessage,
}: TCommentFormProps) {
  return (
    <Form>
      <Textarea
        errorMessage={valueErrorMessage}
        isInvalid={!!valueErrorMessage}
        isDisabled={isLoading}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setValue(event.target.value)
        }
        label="Comment"
      />
      <Button
        color="primary"
        isIconOnly
        onPress={onPublish}
        isLoading={isLoading}
      >
        <MdSend size={22} />
      </Button>
    </Form>
  );
}
