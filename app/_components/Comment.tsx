import { Card, CardBody, CardHeader } from "@heroui/card";
import { AvatarProps } from "@heroui/avatar";
import { User } from "@heroui/user";
import { ReactNode } from "react";

type TCommentProps = {
  value: string;
  name: ReactNode;
  description?: ReactNode;
  avatarProps?: Partial<AvatarProps> | undefined;
  userEndContent?: ReactNode;
  startHeaderContent?: ReactNode;
};

export default function Comment({
  avatarProps,
  description,
  name,
  value,
  userEndContent,
  startHeaderContent,
}: TCommentProps) {
  return (
    <Card>
      <CardHeader>
        <div className="space-y-4 w-full">
          {startHeaderContent}
          <div className="flex gap-4 justify-between">
            <User
              avatarProps={avatarProps}
              description={description}
              name={name}
            />
            {userEndContent}
          </div>
        </div>
      </CardHeader>
      <CardBody>{value}</CardBody>
    </Card>
  );
}
