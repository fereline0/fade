"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { TBan } from "@/app/_types/ban";
import { formatDistance } from "date-fns";
import { TPaginate } from "@/app/_types/paginate";
import Paginate from "@/app/_components/Paginate";

type TBansProps = TPaginate & {
  bans: TBan[];
};

export default function Bans({ bans, total, limit }: TBansProps) {
  return (
    <Table
      aria-label="Bans Table"
      bottomContent={<Paginate total={total} limit={limit} />}
    >
      <TableHeader>
        <TableColumn>Initiator</TableColumn>
        <TableColumn>Reason</TableColumn>
        <TableColumn>Expiration Date</TableColumn>
        <TableColumn>Activity</TableColumn>
      </TableHeader>
      <TableBody>
        {bans.map((ban) => (
          <TableRow key={ban.id}>
            <TableCell>{ban.initiator?.name || "Unknown"}</TableCell>
            <TableCell>{ban.reason || "No reason"}</TableCell>
            <TableCell>
              {formatDistance(ban.expires, new Date(), {
                addSuffix: true,
              })}
            </TableCell>
            <TableCell>{ban.activity ? "Active" : "Inactive"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
