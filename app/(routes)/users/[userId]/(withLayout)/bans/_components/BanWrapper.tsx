import Ban from "@/app/_components/Ban";
import { TBan } from "@/app/_types/ban";
import { Link } from "@heroui/link";
import BanActions from "./BanActions";
import { Dispatch, SetStateAction } from "react";

type TBanWrapperProps = {
  ban: TBan;
  userRolePosition: number;
  setBanForEdit: Dispatch<SetStateAction<TBan | null>>;
};

export default function BanWrapper({
  ban,
  userRolePosition,
  setBanForEdit,
}: TBanWrapperProps) {
  return (
    <Ban
      key={ban.id}
      initiatorName={
        ban.initiator?.name ? (
          <Link href={`/users/${ban.initiatorId}`}>{ban.initiator.name}</Link>
        ) : (
          "Unknown"
        )
      }
      reason={ban.reason}
      expires={ban.expires}
      formattedExpires={ban.formattedExpires || ""}
      activity={ban.activity}
      endHeaderContent={
        <BanActions
          ban={ban}
          userRolePosition={userRolePosition}
          setBanForEdit={setBanForEdit}
        />
      }
    />
  );
}
