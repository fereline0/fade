"use client";

import { TBan } from "@/app/_types/ban";
import { TPaginate } from "@/app/_types/paginate";
import Paginate from "@/app/_components/shared/Paginate";
import BanWrapper from "./BanWrapper";
import { useState } from "react";
import BanFormWrapper from "./BanFormWrapper";

type TBansProps = {
  userId: string;
  userRolePosition: number;
  localTimeZone: string;
  bans: TBan[];
} & TPaginate;

export default function Bans({
  userId,
  userRolePosition,
  localTimeZone,
  bans,
  total,
  limit,
}: TBansProps) {
  const [banForEdit, setBanForEdit] = useState<TBan | null>(null);

  return (
    <div className="space-y-4">
      <BanFormWrapper
        userId={userId}
        userRolePosition={userRolePosition}
        localTimeZone={localTimeZone}
        banForEdit={banForEdit}
        setBanForEdit={setBanForEdit}
      />
      {bans.map((ban) => (
        <BanWrapper
          key={ban.id}
          ban={ban}
          userRolePosition={userRolePosition}
          setBanForEdit={setBanForEdit}
        />
      ))}
      <Paginate total={total} limit={limit} />
    </div>
  );
}
