"use client";

import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { FaGithub, FaYandexInternational } from "react-icons/fa";
import { useTransition } from "react";
import { login } from "../actions";

export default function Login() {
  const [isPendingGitHub, startTransitionGitHub] = useTransition();
  const [isPendingYandex, startTransitionYandex] = useTransition();

  const handleSignInWithGitHub = async () => {
    startTransitionGitHub(async () => {
      await login("github");
    });
  };

  const handleSignInWithYandex = async () => {
    startTransitionYandex(async () => {
      await login("yandex");
    });
  };

  return (
    <Card className="mx-auto max-w-full w-full md:max-w-80">
      <CardBody>
        <div className="space-y-2">
          <Button
            isLoading={isPendingGitHub}
            fullWidth
            className="bg-black text-white"
            startContent={<FaGithub size={22} />}
            onPress={handleSignInWithGitHub}
          >
            GitHub
          </Button>
          <Button
            isLoading={isPendingYandex}
            fullWidth
            className="bg-[#ff0000] text-white"
            startContent={<FaYandexInternational size={22} />}
            onPress={handleSignInWithYandex}
          >
            Yandex
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
