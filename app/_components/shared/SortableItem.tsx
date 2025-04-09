import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { ReactNode } from "react";
import { MdDragIndicator } from "react-icons/md";

type SortableItemProps = {
  id: string;
  children: ReactNode;
  disabled?: boolean;
};

export function SortableItem({ id, children, disabled }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx("flex items-center gap-4", [disabled && " opacity-50"])}
    >
      {children}
      <div
        {...attributes}
        {...listeners}
        className={`${disabled ? "cursor-default" : "cursor-grab"} p-1`}
      >
        <MdDragIndicator size={20} />
      </div>
    </div>
  );
}
