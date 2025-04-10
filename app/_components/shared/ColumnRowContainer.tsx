import { ReactNode } from "react";

type TColumnRowContainerProps = {
  children: ReactNode;
};

export default function ColumnRowContainer({
  children,
}: TColumnRowContainerProps) {
  return (
    <div className="flex justify-between flex-col gap-4 md:flex-row">
      {children}
    </div>
  );
}
