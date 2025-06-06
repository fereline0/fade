"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@heroui/pagination";
import { TPaginate } from "../../_types/paginate";
import { VariantProps } from "@heroui/theme";

type TPaginateProps = {
  paginationProps?: Omit<
    VariantProps<typeof Pagination>,
    "initialPage" | "total" | "onChange"
  >;
} & TPaginate;

export default function Paginate({
  total,
  limit,
  paginationProps = { showShadow: true },
}: TPaginateProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPageCount = Math.ceil(total / limit);
  const point = Number(searchParams.get("page")) || 1;

  const createPageURL = (page: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    return params.toString();
  };

  return (
    <Pagination
      initialPage={point}
      total={totalPageCount}
      onChange={(page: number) =>
        router.push(`?${createPageURL(page.toString())}`)
      }
      {...paginationProps}
    />
  );
}
