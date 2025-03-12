import { Card, CardBody } from "@heroui/card";
import { useServerAction } from "zsa-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { createBan, updateBan } from "../actions";
import { canCreateBan } from "../policies";
import { DateValue, parseAbsolute } from "@internationalized/date";
import { TBan } from "@/app/_types/ban";
import { DatePicker } from "@heroui/date-picker";
import { Input } from "@heroui/input";
import { ImHammer2 } from "react-icons/im";
import { MdOutlineCancel } from "react-icons/md";
import { useIsSSR } from "@react-aria/ssr";
import { IoMdCheckmark } from "react-icons/io";
import { Checkbox } from "@heroui/checkbox";

type TBanFormProps = {
  userId: string;
  userRolePosition: number;
  localTimeZone: string;
  banForEdit: TBan | null;
  setBanForEdit: Dispatch<SetStateAction<TBan | null>>;
};

export default function BanForm({
  userId,
  userRolePosition,
  localTimeZone,
  banForEdit,
  setBanForEdit,
}: TBanFormProps) {
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
  const authedUserAbilities = authedUser?.role?.abilities || [];
  const authedUserBans = authedUser?.bans || [];

  const clearForm = () => {
    setReason("");
    setExpires(null);
    setBanForEdit(null);
  };

  const onPublish = async () => {
    if (!authedUser || !expires) return;

    const formattedReason = reason || null;
    const expiresToIsoString = new Date(
      expires.toDate(localTimeZone),
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
        initiatorId: authedUser.id,
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
          <Form
            validationErrors={
              banForEdit ? updateError?.fieldErrors : createError?.fieldErrors
            }
          >
            <Input
              name="reason"
              value={reason}
              onValueChange={setReason}
              label="Reason"
            />
            <DatePicker
              name="expires"
              label="Expires"
              granularity={isSSR ? "day" : "minute"}
              value={expires}
              onChange={setExpires}
            />
            <Checkbox
              color="danger"
              isSelected={activity}
              onValueChange={setActivity}
            >
              Activity
            </Checkbox>
            <Button
              color="danger"
              isIconOnly
              onPress={onPublish}
              isLoading={isCreatePending || isUpdatePending}
              isDisabled={
                !authedUser ||
                !canCreateBan(
                  userRolePosition,
                  authedUser?.role?.position || -Infinity,
                  authedUserAbilities,
                  authedUserBans,
                )
              }
            >
              {banForEdit ? (
                <IoMdCheckmark size={22} />
              ) : (
                <ImHammer2 size={22} />
              )}
            </Button>
          </Form>
        </div>
      </CardBody>
    </Card>
  );
}
