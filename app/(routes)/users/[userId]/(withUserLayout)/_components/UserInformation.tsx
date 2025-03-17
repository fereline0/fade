import { TUser } from "@/app/_types/user";
import { Card, CardBody } from "@heroui/card";

type TUserInformationProps = {
  user: TUser;
};

export default function UserInformation({
  user: { name },
}: TUserInformationProps) {
  return (
    <Card>
      <CardBody>
        <h2 className="font-bold text-2xl">{name}</h2>
      </CardBody>
    </Card>
  );
}
