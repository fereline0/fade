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
import { useState } from "react";
import { useIsSSR } from "@react-aria/ssr";
import Loading from "@/app/_components/Loading";
import { useSession } from "next-auth/react";
import RoleWrapper from "./RoleWrapper";
import { canUpdateRole } from "../policies";
import { useServerAction } from "zsa-react";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { updateRoles } from "../actions";
import { IoMdCheckmark } from "react-icons/io";

type TRolesProps = {
  roles: TRole[];
};

export default function Roles({ roles }: TRolesProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const isSSR = useIsSSR();

  const [localRoles, setLocalRoles] = useState<TRole[]>(roles);

  const authedUser = session?.user;
  const authedUserRole = authedUser?.role;

  const { isPending, execute } = useServerAction(updateRoles);

  const findChangedRoles = (arr1: TRole[], arr2: TRole[]): TRole[] => {
    return arr1.filter((item1) => {
      const item2 = arr2.find((item) => item.id === item1.id);
      if (!item2) return false;

      return item1.name !== item2.name || item1.position !== item2.position;
    });
  };

  const checkIsDisabled = (rolePosition: number) =>
    !canUpdateRole(
      authedUserRole?.abilities || [],
      authedUser?.bans || [],
      authedUserRole?.position || -Infinity,
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

    if (
      checkIsDisabled(activeRole.position) ||
      checkIsDisabled(overRole.position)
    ) {
      return;
    }

    const oldIndex = localRoles.findIndex((role) => role.id === active.id);
    const newIndex = localRoles.findIndex((role) => role.id === over.id);

    const updatedRoles = arrayMove(localRoles, oldIndex, newIndex);

    const rolesWithUpdatedPositions = updatedRoles.map((role, index) => ({
      ...role,
      position: index + 1,
    }));

    setLocalRoles(rolesWithUpdatedPositions);
  };

  const changedRoles = findChangedRoles(localRoles, roles);

  const onPublish = async () => {
    await execute({
      roles: changedRoles,
    });

    router.refresh();
  };

  const isDisabled = changedRoles.some((changedRole) =>
    checkIsDisabled(changedRole.position),
  );

  return (
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
              {localRoles.map((role) => {
                return (
                  <RoleWrapper
                    key={role.id}
                    role={role}
                    isDisabled={checkIsDisabled(role.position)}
                  />
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      )}
      <Button
        isIconOnly
        isDisabled={isDisabled}
        startContent={<IoMdCheckmark size={22} />}
        color="primary"
        isLoading={isPending}
        onPress={onPublish}
      />
    </div>
  );
}
