import { ReactNode } from "react";

type TColumnRowContainerMainProps = {
  children: ReactNode;
};

export default function ColumnRowContainerMain({
  children,
}: TColumnRowContainerMainProps) {
  return <div className="w-full">{children}</div>;
}
