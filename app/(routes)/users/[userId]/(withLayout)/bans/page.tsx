import { prisma } from "@/app/_utils/prisma";
import { notFound } from "next/navigation";
import Bans from "./_components/Bans";
import { formatDistance } from "date-fns";
import { TBan } from "@/app/_types/ban";
import { getLocalTimeZone } from "@internationalized/date";

type TBansPageProps = {
  params: Promise<{
    userId: string;
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
  const { userId } = await params;

  const { page = "1", limit = "20" } = await searchParams;

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);
  const pageToSkip = (parsedPage - 1) * parsedLimit;

  const localTimeZone = getLocalTimeZone();

  try {
    const [bans, count] = await prisma.$transaction([
      prisma.ban.findMany({
        where: {
          userId,
        },
        skip: pageToSkip,
        take: parsedLimit,
        include: {
          initiator: true,
        },
      }),
      prisma.ban.count({
        where: {
          userId,
        },
      }),
    ]);

    const now = new Date();
    const formattedBans: TBan[] = bans.map((ban) => ({
      ...ban,
      formattedExpires: formatDistance(ban.expires, now, {
        addSuffix: true,
      }),
    }));

    return (
      <Bans
        userId={userId}
        localTimeZone={localTimeZone}
        bans={formattedBans}
        total={count}
        limit={parsedLimit}
      />
    );
  } catch (error) {
    notFound();
  }
}
