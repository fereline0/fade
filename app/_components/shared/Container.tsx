import { ReactNode } from "react";

type TContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: TContainerProps) {
  return (
    <div className="flex justify-between flex-col gap-4 md:flex-row">
      {children}
    </div>
  );
}
