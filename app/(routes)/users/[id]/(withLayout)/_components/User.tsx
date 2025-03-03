"use client";

import { Tab, Tabs } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { VariantProps } from "@heroui/theme";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Link } from "@heroui/link";
import UserHeader from "./UserHeader";
import { TUser } from "@/app/_types/user";

type TUserProps = {
  user: TUser;
  children: ReactNode;
};

export default function User({ user, children }: TUserProps) {
  const pathname = usePathname();

  const tabs: VariantProps<typeof Tab>[] = [
    {
      key: `/users/${user.id}`,
      id: `/users/${user.id}`,
      title: "Comments",
      href: `/users/${user.id}`,
      as: Link,
    },
  ];

  return (
    <div className="space-y-4">
      <UserHeader user={user} />
      <Card>
        <CardBody>
          <Tabs aria-label="Tabs" selectedKey={pathname}>
            {tabs.map(({ key, ...tab }) => (
              <Tab key={key} {...tab} />
            ))}
          </Tabs>
        </CardBody>
      </Card>
      {children}
    </div>
  );
}
