"use client";

import React, { useTransition } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { useSession } from "next-auth/react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Form } from "@heroui/form";
import { Spinner } from "@heroui/spinner";
import { VariantProps } from "@heroui/theme";
import { logOut } from "../../(routes)/login/actions";
import ThemeSwitcher from "./ThemeSwitcher";
import Logo from "./Logo";
import { FiUser } from "react-icons/fi";
import { IoMdExit } from "react-icons/io";

export default function Header() {
  const { data: session, status } = useSession();

  const {
    isOpen: isOpenSignOut,
    onOpen: onOpenSignOut,
    onOpenChange: onOpenChangeSignOut,
  } = useDisclosure();

  const [signOutIsPending, signOutStartTransition] = useTransition();

  const handleSignOut = async () => {
    signOutStartTransition(async () => {
      await logOut();
    });
  };

  const items: VariantProps<typeof DropdownItem>[] = [
    {
      key: "user",
      as: Link,
      startContent: <FiUser size={22} />,
      href: `/users/${session?.user?.id}`,
      children: session?.user?.name,
    },
    {
      key: "signOut",
      onPress: onOpenSignOut,
      startContent: <IoMdExit size={22} />,
      color: "danger",
      children: "Log out",
    },
  ];

  return (
    <>
      <Navbar>
        <NavbarContent>
          <NavbarBrand>
            <Link href="/">
              <Logo />
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
          {status === "loading" ? (
            <Spinner />
          ) : status === "authenticated" ? (
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  className="cursor-pointer"
                  size="sm"
                  isBordered
                  color="default"
                  name={session.user.name ?? undefined}
                  src={session.user.image ?? undefined}
                />
              </DropdownTrigger>
              <DropdownMenu items={items}>
                {({ key, ...item }) => <DropdownItem key={key} {...item} />}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem>
              <Button as={Link} color="primary" href="/login">
                Login
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>
      </Navbar>
      <Modal isOpen={isOpenSignOut} onOpenChange={onOpenChangeSignOut}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Are you sure you want to log out of your account?
          </ModalHeader>
          <ModalBody>
            After logging out of your account, you will lose access to private
            routes and personal data until the next authorization.
          </ModalBody>
          <ModalFooter>
            <Form action={handleSignOut}>
              <Button
                type="submit"
                startContent={<IoMdExit size={22} />}
                color="danger"
                isLoading={signOutIsPending}
              >
                Log out
              </Button>
            </Form>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
