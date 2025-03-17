import { TUser } from "@/app/_types/user";
import { getContrastHEXColor } from "@/app/_utils/color";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";

type TUserSideBarProps = {
  user: TUser;
};

export default function UserSideBar({
  user,
  user: { role },
}: TUserSideBarProps) {
  const roleColor = role?.color;

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-2 text-center items-center">
          <Image isBlurred src={user.image ?? undefined} width={256} />
          {role && roleColor && (
            <div
              style={{
                backgroundColor: roleColor,
              }}
              className="px-2 py-1 rounded-lg w-full"
            >
              <p
                style={{
                  color: getContrastHEXColor(roleColor),
                }}
              >
                {role.name}
              </p>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
