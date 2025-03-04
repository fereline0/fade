"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@heroui/pagination";
import { TPaginate } from "../_types/paginate";

export default function Paginate(props: TPaginate) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPageCount = Math.ceil(props.total / props.limit);
  const point = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber);
    return params.toString();
  };

  return (
    <Pagination
      initialPage={point}
      showShadow
      total={totalPageCount}
      onChange={(page: number) =>
        router.push(`?${createPageURL(page.toString())}`)
      }
    />
  );
}
