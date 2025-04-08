import { Card, CardBody } from "@heroui/card";
import { VariantProps } from "@heroui/theme";
import { ReactNode } from "react";

type TRoleProps = {
  name: ReactNode;
  color: string;
  endRoleContent?: ReactNode;
} & Omit<VariantProps<typeof Card>, "children">;

export default function Role({
  name,
  color,
  endRoleContent,
  ...cardProps
}: TRoleProps) {
  return (
    <Card fullWidth {...cardProps}>
      <CardBody>
        <div className="flex gap-4 justify-between">
          <div className="flex gap-2 items-center">
            <div
              style={{
                backgroundColor: color,
              }}
              className="rounded-full w-2 h-2"
            />
            {name}
          </div>
          {endRoleContent}
        </div>
      </CardBody>
    </Card>
  );
}
