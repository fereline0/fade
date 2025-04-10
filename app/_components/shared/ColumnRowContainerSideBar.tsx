import { ReactNode } from "react";

type TColumnRowContainerSideBarProps = {
  children: ReactNode;
};

export default function ColumnRowContainerSideBar({
  children,
}: TColumnRowContainerSideBarProps) {
  return <div className="max-w-full w-full md:max-w-64">{children}</div>;
}
