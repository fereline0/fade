import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { AvatarProps } from "@heroui/avatar";
import { User } from "@heroui/user";
import { ReactNode } from "react";
import { VariantProps } from "@heroui/theme";

type TMessageProps = {
  value: ReactNode;
  name: ReactNode;
  description?: ReactNode;
  avatarProps?: Partial<AvatarProps>;
  userEndContent?: ReactNode;
  startHeaderContent?: ReactNode;
  footerContent?: ReactNode;
} & Omit<VariantProps<typeof Card>, "children">;

export default function Message({
  avatarProps,
  description,
  name,
  value,
  userEndContent,
  startHeaderContent,
  footerContent,
  ...cardProps
}: TMessageProps) {
  return (
    <Card {...cardProps}>
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
      {footerContent && <CardFooter>{footerContent}</CardFooter>}
    </Card>
  );
}
