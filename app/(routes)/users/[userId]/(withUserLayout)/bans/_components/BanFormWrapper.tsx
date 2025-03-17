import { Card, CardBody } from "@heroui/card";
import { useServerAction } from "zsa-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@heroui/button";
import { createBan, updateBan } from "../actions";
import { canCreateBan, canUpdateBan } from "../policies";
import { DateValue, parseAbsolute } from "@internationalized/date";
import { TBan } from "@/app/_types/ban";
import { MdOutlineCancel } from "react-icons/md";
import { useIsSSR } from "@react-aria/ssr";
import { IoMdCheckmark } from "react-icons/io";
import BanForm from "@/app/_components/shared/BanForm";
import { ImHammer2 } from "react-icons/im";

type TBanFormWrapperProps = {
  userId: string;
  userRolePosition: number;
  localTimeZone: string;
  banForEdit: TBan | null;
  setBanForEdit: Dispatch<SetStateAction<TBan | null>>;
};

export default function BanFormWrapper({
  userId,
  userRolePosition,
  localTimeZone,
  banForEdit,
  setBanForEdit,
}: TBanFormWrapperProps) {
  const router = useRouter();
  const isSSR = useIsSSR();
  const { data: session } = useSession();
  const [reason, setReason] = useState<string>("");
  const [expires, setExpires] = useState<DateValue | null>(null);
  const [activity, setActivity] = useState(true);

  const {
    isPending: isCreatePending,
    execute: executeCreate,
    isSuccess: isCreateSuccess,
    error: createError,
  } = useServerAction(createBan);

  const {
    isPending: isUpdatePending,
    execute: executeUpdate,
    isSuccess: isUpdateSuccess,
    error: updateError,
  } = useServerAction(updateBan);

  const authedUser = session?.user;
  const authedUserRole = authedUser?.role;
  const authedUserRolePosition = authedUserRole?.position!;
  const authedUserRoleAbilities = authedUser?.role?.abilities || [];
  const authedUserBans = authedUser?.bans || [];

  const clearForm = () => {
    setReason("");
    setExpires(null);
    setBanForEdit(null);
  };

  const onSubmit = async () => {
    const formattedReason = reason || null;
    const expiresToIsoString = new Date(
      expires!.toDate(localTimeZone),
    ).toISOString();

    if (banForEdit) {
      await executeUpdate({
        id: banForEdit.id,
        userRolePosition,
        reason: formattedReason,
        expires: expiresToIsoString,
        activity,
      });
    } else {
      await executeCreate({
        userId,
        userRolePosition,
        reason: formattedReason,
        initiatorId: authedUser!.id,
        expires: expiresToIsoString,
        activity,
      });
    }

    router.refresh();
  };

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      clearForm();
    }
  }, [isCreateSuccess, isUpdateSuccess]);

  useEffect(() => {
    if (banForEdit) {
      setReason(banForEdit.reason || "");
      setExpires(
        parseAbsolute(
          new Date(banForEdit.expires).toISOString(),
          localTimeZone,
        ),
      );
      setActivity(banForEdit.activity);
    } else {
      clearForm();
    }
  }, [banForEdit]);

  const isDisabled = banForEdit
    ? !canUpdateBan(
        userRolePosition,
        authedUserBans,
        authedUserRolePosition,
        authedUserRoleAbilities,
      )
    : !canCreateBan(
        userRolePosition,
        authedUserBans,
        authedUserRolePosition,
        authedUserRoleAbilities,
      );

  return (
    <Card>
      <CardBody>
        <div className="space-y-4">
          {banForEdit && (
            <Button
              startContent={<MdOutlineCancel size={22} />}
              onPress={clearForm}
            >
              Cancel update
            </Button>
          )}
          <BanForm
            onSubmit={onSubmit}
            reason={reason}
            setReason={setReason}
            expires={expires}
            setExpires={setExpires}
            activity={activity}
            setActivity={setActivity}
            isLoading={isCreatePending || isUpdatePending}
            expiresGranularity={isSSR ? "day" : "minute"}
            isDisabled={isDisabled}
            validationErrors={
              banForEdit ? updateError?.fieldErrors : createError?.fieldErrors
            }
            submitButtonProps={{
              color: "danger",
              isIconOnly: true,
              children: banForEdit ? (
                <IoMdCheckmark size={22} />
              ) : (
                <ImHammer2 size={22} />
              ),
            }}
          />
        </div>
      </CardBody>
    </Card>
  );
}
