import { ReactNode } from "react";
import { TUser } from "@/app/_types/user";
import Container from "@/app/_components/shared/Container";
import ContainerSideBar from "@/app/_components/shared/ContainerSideBar";
import ContainerMain from "@/app/_components/shared/ContainerMain";
import UserSideBar from "./UserSideBar";
import UserInformation from "./UserInformation";
import UserTabs from "./UserTabs";

type TUsertProps = {
  user: TUser;
  children: ReactNode;
};

export default function User({ user, children }: TUsertProps) {
  return (
    <Container>
      <ContainerSideBar>
        <UserSideBar user={user} />
      </ContainerSideBar>
      <ContainerMain>
        <div className="space-y-4">
          <UserInformation user={user} />
          <UserTabs user={user} />
          {children}
        </div>
      </ContainerMain>
    </Container>
  );
}
