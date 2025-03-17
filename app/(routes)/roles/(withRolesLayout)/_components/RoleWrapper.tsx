import Role from "@/app/_components/shared/Role";
import { SortableItem } from "@/app/_components/shared/SortableItem";
import { TRole } from "@/app/_types/role";
import { Link } from "@heroui/link";

type TRoleWrapperProps = {
  role: TRole;
  isDisabled?: boolean;
};

export default function RoleWrapper({
  role: { id, name, color },
  isDisabled,
}: TRoleWrapperProps) {
  return (
    <SortableItem key={id} id={id} disabled={isDisabled}>
      <Role
        name={
          isDisabled ? name : <Link href={`/roles/${id}/update`}>{name}</Link>
        }
        color={color}
      />
    </SortableItem>
  );
}
