"use client";

import { TBan } from "@/app/_types/ban";
import { TPaginate } from "@/app/_types/paginate";
import Paginate from "@/app/_components/Paginate";
import BanWrapper from "./BanWrapper";
import BanForm from "./BanForm";
import { useState } from "react";

type TBansProps = TPaginate & {
  userId: string;
  localTimeZone: string;
  bans: TBan[];
};

export default function Bans({
  userId,
  localTimeZone,
  bans,
  total,
  limit,
}: TBansProps) {
  const [banForEdit, setBanForEdit] = useState<TBan | null>(null);

  return (
    <div className="space-y-4">
      <BanForm
        userId={userId}
        localTimeZone={localTimeZone}
        banForEdit={banForEdit}
        setBanForEdit={setBanForEdit}
      />
      {bans.map((ban) => (
        <BanWrapper key={ban.id} ban={ban} setBanForEdit={setBanForEdit} />
      ))}
      <Paginate total={total} limit={limit} />
    </div>
  );
}
