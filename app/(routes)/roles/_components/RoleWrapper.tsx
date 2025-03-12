import Role from "@/app/_components/Role";
import { SortableItem } from "@/app/_components/SortableItem";
import { TRole } from "@/app/_types/role";

type TRoleWrapperProps = {
  role: TRole;
  isDisabled: boolean;
};

export default function RoleWrapper({ role, isDisabled }: TRoleWrapperProps) {
  return (
    <SortableItem key={role.id} id={role.id} disabled={isDisabled}>
      <Role name={role.name} />
    </SortableItem>
  );
}
