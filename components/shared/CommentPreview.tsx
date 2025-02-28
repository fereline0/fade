import { Card, CardBody } from "@heroui/card";
import { PressEvent } from "@react-types/shared";
import { ReactNode } from "react";

type TCommentPreviewProps = {
  name: string;
  value: string;
  startContent?: ReactNode;
  onPress?: ((e: PressEvent) => void) | undefined;
};

export default function CommentPreview({
  name,
  value,
  startContent,
  onPress,
}: TCommentPreviewProps) {
  return (
    <Card fullWidth onPress={onPress} isPressable={!!onPress}>
      <CardBody>
        <div className="flex items-center gap-4">
          {startContent}
          <div className="min-w-0 flex-1 space-y-1">
            <p className="font-bold">{name}</p>{" "}
            <p className="truncate">{value}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
