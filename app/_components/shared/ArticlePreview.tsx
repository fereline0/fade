import { Card, CardBody } from "@heroui/card";
import { AvatarProps } from "@heroui/avatar";
import { User } from "@heroui/user";
import { ReactNode } from "react";
import ColumnRowContainer from "./ColumnRowContainer";

type TArticlePreviewProps = {
  title: ReactNode;
  description?: ReactNode;
  responderName: ReactNode;
  responderDescription?: ReactNode;
  responderAvatarProps?: Partial<AvatarProps>;
};

export default function ArticlePreview({
  title,
  description,
  responderName,
  responderDescription,
  responderAvatarProps,
}: TArticlePreviewProps) {
  return (
    <Card>
      <CardBody>
        <ColumnRowContainer>
          <div>
            <h3 className="text-lg font-bold">{title}</h3>
            {description}
          </div>
          <div className="w-full max-w-48">
            <User
              name={responderName}
              description={responderDescription}
              avatarProps={responderAvatarProps}
            />
          </div>
        </ColumnRowContainer>
      </CardBody>
    </Card>
  );
}
