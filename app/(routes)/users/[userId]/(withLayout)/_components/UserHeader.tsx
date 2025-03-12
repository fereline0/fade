import { TUser } from "@/app/_types/user";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";

type TUserHeaderProps = {
  user: TUser;
};

export default function UserHeader({ user }: TUserHeaderProps) {
  return (
    <Card>
      <CardBody>
        <div className="flex flex-col items-center md:items-start md:flex-row gap-4">
          <Image isBlurred src={user.image ?? undefined} width={220} />
          <h2 className="font-bold text-2xl">{user.name}</h2>
        </div>
      </CardBody>
    </Card>
  );
}
