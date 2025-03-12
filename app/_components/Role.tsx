import { Card, CardBody } from "@heroui/card";
import { ReactNode } from "react";

type TRoleProps = {
  name: string;
  endRoleContent?: ReactNode;
};

export default function Role({ name, endRoleContent }: TRoleProps) {
  return (
    <Card>
      <CardBody>
        <div className="flex gap-4 justify-between">
          <p>{name}</p>
          {endRoleContent}
        </div>
      </CardBody>
    </Card>
  );
}
