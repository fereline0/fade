"use client";

import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button, PressEvent } from "@heroui/button";
import { Switch } from "@heroui/switch";
import { HexColorPicker } from "react-colorful";
import ColorPicker from "@/app/_components/shared/ColorPicker";
import { TAbility } from "@/app/_types/ability";
import { Dispatch, SetStateAction } from "react";
import { ValidationErrors } from "@react-types/shared";
import { VariantProps } from "@heroui/theme";
import { abilitiesDescription } from "@/app/_data/ability";

type TRoleFormProps = {
  onSubmit: (e: PressEvent) => void;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  abilities: TAbility[];
  selectedAbilities: TAbility[];
  setSelectedAbilities: Dispatch<SetStateAction<TAbility[]>>;
  validationErrors?: ValidationErrors;
  isLoading?: boolean;
  isDisabled?: boolean;
  submitButtonProps?: Omit<
    VariantProps<typeof Button>,
    "onPress" | "isLoading" | "isDisabled"
  >;
};

export default function RoleForm({
  onSubmit,
  name,
  setName,
  color,
  setColor,
  abilities,
  selectedAbilities,
  setSelectedAbilities,
  validationErrors,
  isLoading,
  isDisabled,
  submitButtonProps,
}: TRoleFormProps) {
  const handleAbilityChange = (ability: TAbility) => {
    setSelectedAbilities((prev) =>
      prev.some((a) => a.id === ability.id)
        ? prev.filter((a) => a.id !== ability.id)
        : [...prev, ability],
    );
  };

  return (
    <Form validationErrors={validationErrors}>
      <div className="flex gap-4 items-center w-full">
        <Input name="name" value={name} onValueChange={setName} label="Name" />
        <ColorPicker color={color}>
          <HexColorPicker color={color} onChange={setColor} />
        </ColorPicker>
      </div>
      <div className="space-y-4 w-full">
        {abilities.map((ability) => {
          const { label, description } = abilitiesDescription[ability.slug] || {
            label: ability.slug,
          };

          return (
            <div
              key={ability.id}
              className="flex items-center gap-4 justify-between"
            >
              <div>
                <p className="font-medium">{label}</p>
                {description && (
                  <p className="text-sm text-gray-500">{description}</p>
                )}
              </div>
              <Switch
                name="abilitties"
                isSelected={selectedAbilities.some((a) => a.id === ability.id)}
                onChange={() => handleAbilityChange(ability)}
              />
            </div>
          );
        })}
      </div>
      <Button
        onPress={onSubmit}
        isLoading={isLoading}
        isDisabled={isDisabled}
        {...submitButtonProps}
      />
    </Form>
  );
}
