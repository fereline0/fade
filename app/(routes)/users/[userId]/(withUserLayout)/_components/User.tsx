import { ReactNode } from "react";
import { TUser } from "@/app/_types/user";
import UserSideBar from "./UserSideBar";
import UserInformation from "./UserInformation";
import UserTabs from "./UserTabs";
import ColumnRowContainer from "@/app/_components/shared/ColumnRowContainer";
import ColumnRowContainerMain from "@/app/_components/shared/ColumnRowContainerMain";
import ColumnRowContainerSideBar from "@/app/_components/shared/ColumnRowContainerSideBar";

type TUsertProps = {
  user: TUser;
  children: ReactNode;
};

export default function User({ user, children }: TUsertProps) {
  return (
    <ColumnRowContainer>
      <ColumnRowContainerSideBar>
        <UserSideBar user={user} />
      </ColumnRowContainerSideBar>
      <ColumnRowContainerMain>
        <div className="space-y-4">
          <UserInformation user={user} />
          <UserTabs user={user} />
          {children}
        </div>
      </ColumnRowContainerMain>
    </ColumnRowContainer>
  );
}
