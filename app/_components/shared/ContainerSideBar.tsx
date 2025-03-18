import { ReactNode } from "react";

type TContainerSideBarProps = {
  children: ReactNode;
};

export default function ContainerSideBar({ children }: TContainerSideBarProps) {
  return <div className="max-w-full w-full md:max-w-64">{children}</div>;
}
