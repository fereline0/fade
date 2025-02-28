"use client";

import { TUser } from "@/types/user";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import UserComments from "../entities/UserComments";

type TUserProps = {
  user: TUser;
};

export default function User({ user }: TUserProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardBody>
          <div className="flex gap-4">
            <Image isBlurred src={user.image ?? undefined} width={220} />
            <div>
              <h2 className="font-bold text-2xl">{user.name}</h2>
            </div>
          </div>
        </CardBody>
      </Card>
      <UserComments user={user} />
    </div>
  );
}
