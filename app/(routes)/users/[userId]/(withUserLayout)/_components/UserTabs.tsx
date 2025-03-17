"use client";

import { Tab, Tabs } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { VariantProps } from "@heroui/theme";
import { TUser } from "@/app/_types/user";
import { Link } from "@heroui/link";
import { usePathname } from "next/navigation";

type TUserTabsProps = {
  user: TUser;
};

export default function UserTabs({ user: { id } }: TUserTabsProps) {
  const pathname = usePathname();

  const tabs: VariantProps<typeof Tab>[] = [
    {
      key: `/users/${id}`,
      id: `/users/${id}`,
      title: "Comments",
      href: `/users/${id}`,
      as: Link,
    },
    {
      key: `/users/${id}/bans`,
      id: `/users/${id}/bans`,
      title: "Bans",
      href: `/users/${id}/bans`,
      as: Link,
    },
  ];

  return (
    <Card>
      <CardBody>
        <Tabs aria-label="Tabs" selectedKey={pathname}>
          {tabs.map(({ key, ...tab }) => (
            <Tab key={key} {...tab} />
          ))}
        </Tabs>
      </CardBody>
    </Card>
  );
}
