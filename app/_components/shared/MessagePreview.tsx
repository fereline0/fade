import { Card, CardBody } from "@heroui/card";
import { VariantProps } from "@heroui/theme";
import { ReactNode } from "react";

type TMessagePreviewProps = {
  name: string;
  value: string;
  startContent?: ReactNode;
} & Omit<VariantProps<typeof Card>, "children">;

export default function MessagePreview({
  name,
  value,
  startContent,
  ...cardProps
}: TMessagePreviewProps) {
  return (
    <Card {...cardProps}>
      <CardBody>
        <div className="flex items-center gap-4">
          {startContent}
          <div className="min-w-0 flex-1 space-y-1">
            <p className="font-bold">{name}</p>
            <p className="truncate">{value}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
