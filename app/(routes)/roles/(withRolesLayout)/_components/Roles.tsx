"use client";

import { TRole } from "@/app/_types/role";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { ReactNode, useEffect, useState } from "react";
import { useIsSSR } from "@react-aria/ssr";
import Loading from "@/app/_components/shared/Loading";
import { useSession } from "next-auth/react";
import { useServerAction } from "zsa-react";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { IoMdCheckmark } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { Link } from "@heroui/link";
import { Alert } from "@heroui/alert";
import { updateRolesPositions } from "../actions";
import { canCreateRole, canUpdateRole, canUpdateRoles } from "../policies";
import RoleWrapper from "./RoleWrapper";
import ColumnRowContainer from "@/app/_components/shared/ColumnRowContainer";
import ColumnRowContainerSideBar from "@/app/_components/shared/ColumnRowContainerSideBar";
import ColumnRowContainerMain from "@/app/_components/shared/ColumnRowContainerMain";

type TRolesProps = {
  roles: TRole[];
  children: ReactNode;
};

export default function Roles({ roles, children }: TRolesProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const isSSR = useIsSSR();

  const [localRoles, setLocalRoles] = useState<TRole[]>(roles);

  const authedUser = session?.user;
  const authedUserBans = authedUser?.bans || [];
  const authedUserRole = authedUser?.role;
  const authedUserRoleAbilities = authedUserRole?.abilities || [];

  const { isPending, execute } = useServerAction(updateRolesPositions);

  useEffect(() => {
    console.log(roles);
    roles && setLocalRoles(roles);
  }, [roles]);

  const findChangedRoles = (arr1: TRole[], arr2: TRole[]): TRole[] => {
    return arr1.filter((item1) => {
      const item2 = arr2.find((item) => item.id === item1.id);
      if (!item2) return false;

      return item1.position !== item2.position;
    });
  };

  const checkIsDisabled = (rolePosition: number) =>
    !canUpdateRole(
      authedUserBans,
      authedUserRoleAbilities,
      authedUserRole?.position!,
      rolePosition,
    );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const activeRole = localRoles.find((role) => role.id === active.id);
    const overRole = localRoles.find((role) => role.id === over.id);

    if (!activeRole || !overRole) {
      return;
    }

    const oldIndex = localRoles.findIndex((role) => role.id === active.id);
    const newIndex = localRoles.findIndex((role) => role.id === over.id);

    if (
      checkIsDisabled(activeRole.position) ||
      checkIsDisabled(overRole.position)
    ) {
      return;
    }

    const updatedRoles = arrayMove(localRoles, oldIndex, newIndex);

    const rolesWithUpdatedPositions = updatedRoles.map((role, index) => ({
      ...role,
      position: index,
    }));

    setLocalRoles(rolesWithUpdatedPositions);
  };

  const changedRoles = findChangedRoles(localRoles, roles);

  const onSubmit = async () => {
    await execute({
      roles: changedRoles,
    });

    router.refresh();
  };

  const isDisabled = !canUpdateRoles(
    authedUserBans,
    authedUserRoleAbilities,
    authedUserRole?.position!,
    changedRoles,
  );

  return (
    <ColumnRowContainer>
      <ColumnRowContainerSideBar>
        <div className="space-y-4">
          {isSSR ? (
            <Loading />
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={localRoles}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {localRoles.map((localRole) => {
                    return (
                      <RoleWrapper
                        key={localRole.id}
                        role={localRole}
                        isDisabled={checkIsDisabled(localRole.position)}
                      />
                    );
                  })}
                </div>
              </SortableContext>
            </DndContext>
          )}
          {changedRoles.length > 0 && (
            <Alert color="warning" title={"Don't forget to save changes"} />
          )}
          <Button
            fullWidth
            as={Link}
            startContent={<GoPlus size={22} />}
            href="/roles/create"
            color="primary"
            isDisabled={!canCreateRole(authedUserBans, authedUserRoleAbilities)}
          >
            Create role
          </Button>
          <Button
            isIconOnly
            isDisabled={isDisabled}
            startContent={<IoMdCheckmark size={22} />}
            color="primary"
            isLoading={isPending}
            onPress={onSubmit}
          />
        </div>
      </ColumnRowContainerSideBar>
      <ColumnRowContainerMain>{children}</ColumnRowContainerMain>
    </ColumnRowContainer>
  );
}
