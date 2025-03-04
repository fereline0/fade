import { prisma } from "@/app/_utils/prisma";
import Bans from "./_components/Bans";
import { notFound } from "next/navigation";

type TBansPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
};

export default async function BansPage({
  params,
  searchParams,
}: TBansPageProps) {
  const { id } = await params;

  const { page = "1", limit = "20" } = await searchParams;

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);
  const pageToSkip = (parsedPage - 1) * parsedLimit;

  try {
    const [bans, count] = await prisma.$transaction([
      prisma.ban.findMany({
        where: {
          userId: id,
        },
        skip: pageToSkip,
        take: parsedLimit,
        include: {
          initiator: true,
        },
      }),
      prisma.ban.count({
        where: {
          userId: id,
        },
      }),
    ]);

    return <Bans bans={bans} total={count} limit={parsedLimit} />;
  } catch (error) {
    notFound();
  }
}
