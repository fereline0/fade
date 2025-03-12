import { Card, CardBody, CardHeader } from "@heroui/card";
import { ReactNode } from "react";

type TBanProps = {
  initiatorName: ReactNode;
  reason: ReactNode;
  expires: Date;
  formattedExpires: string;
  activity: ReactNode;
  endHeaderContent?: ReactNode;
};

export default function Ban({
  initiatorName,
  reason,
  expires,
  formattedExpires,
  activity,
  endHeaderContent,
}: TBanProps) {
  return (
    <Card>
      <CardHeader>
        <div className="w-full items-center flex gap-4 justify-between">
          <p>
            The {activity ? "active" : "inactive"} ban issued by {initiatorName}{" "}
            {expires < new Date() ? "has expired" : "will expire"}{" "}
            {formattedExpires}
          </p>
          {endHeaderContent}
        </div>
      </CardHeader>
      {reason && (
        <CardBody>
          <p>{reason}</p>
        </CardBody>
      )}
    </Card>
  );
}
