"use client";

import { Card, CardBody } from "@heroui/card";
import { useEffect, useState } from "react";
import { TAbility } from "@/app/_types/ability";
import RoleForm from "@/app/_components/shared/RoleForm";
import { GoPlus } from "react-icons/go";
import { createRole } from "../actions";
import { useServerAction } from "zsa-react";
import { useRouter } from "next/navigation";

type TRolesCreateProps = {
  abilities: TAbility[];
  randomHEXColor: string;
};

export default function RolesCreate({
  abilities,
  randomHEXColor,
}: TRolesCreateProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [color, setColor] = useState(randomHEXColor);
  const [selectedAbilities, setSelectedAbilities] = useState<TAbility[]>([]);

  const { isPending, execute, isSuccess, error } = useServerAction(createRole);

  useEffect(() => {
    isSuccess && router.replace("/roles");
  }, [isSuccess]);

  return (
    <Card>
      <CardBody>
        <RoleForm
          onSubmit={async () =>
            await execute({ name, color, abilities: selectedAbilities })
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
            children: <GoPlus size={22} />,
          }}
        />
      </CardBody>
    </Card>
  );
}
