import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Login from "./_components/Login";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return <Login />;
}
