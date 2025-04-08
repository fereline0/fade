"use client";

import { Card, CardBody } from "@heroui/card";
import { useEffect, useState } from "react";
import { TAbility } from "@/app/_types/ability";
import RoleForm from "@/app/_components/shared/RoleForm";
import { useServerAction } from "zsa-react";
import { useRouter } from "next/navigation";
import { TRole } from "@/app/_types/role";
import { updateRole } from "../actions";
import { IoMdCheckmark } from "react-icons/io";

type TRoleUpdateProps = {
  role: TRole;
  abilities: TAbility[];
};

export default function RoleUpdate({
  role,
  role: { id, position },
  abilities,
}: TRoleUpdateProps) {
  const router = useRouter();

  const [name, setName] = useState(role.name);
  const [color, setColor] = useState(role.color);
  const [selectedAbilities, setSelectedAbilities] = useState<TAbility[]>(
    role.abilities || [],
  );

  const { isPending, execute, isSuccess, error } = useServerAction(updateRole);

  useEffect(() => {
    if (isSuccess) {
      router.replace("/roles");
      router.refresh();
    }
  }, [isSuccess]);

  return (
    <Card>
      <CardBody>
        <RoleForm
          onSubmit={async () =>
            await execute({
              id,
              name,
              color,
              position,
              abilities: selectedAbilities,
            })
          }
          name={name}
          setName={setName}
          color={color}
          setColor={setColor}
          abilities={abilities}
          validationErrors={error?.fieldErrors}
          selectedAbilities={selectedAbilities}
          setSelectedAbilities={setSelectedAbilities}
          isLoading={isPending}
          submitButtonProps={{
            color: "primary",
            isIconOnly: true,
            children: <IoMdCheckmark size={22} />,
          }}
        />
      </CardBody>
    </Card>
  );
}
