import { ReactNode } from "react";

type TContainerMainProps = {
  children: ReactNode;
};

export default function ContainerMain({ children }: TContainerMainProps) {
  return <div className="w-full">{children}</div>;
}
