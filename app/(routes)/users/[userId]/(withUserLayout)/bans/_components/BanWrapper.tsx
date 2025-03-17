import Ban from "@/app/_components/shared/Ban";
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
  ban: {
    id,
    initiator,
    initiatorId,
    reason,
    expires,
    activity,
    formattedExpires,
  },
  userRolePosition,
  setBanForEdit,
}: TBanWrapperProps) {
  return (
    <Ban
      key={id}
      initiatorName={
        initiator?.name ? (
          <Link href={`/users/${initiatorId}`}>{initiator.name}</Link>
        ) : (
          "Unknown"
        )
      }
      reason={reason}
      expires={expires}
      formattedExpires={formattedExpires || ""}
      activity={activity}
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
