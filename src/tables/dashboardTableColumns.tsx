import { Row } from "@tanstack/react-table";
import { Status } from "../components/Common/Datatable";
import ReactTimeAgo from "react-time-ago";

interface DataType {
  id: number;
  type: string;
  name: string;
  request_type: string;
  submission_date: string;
  status: "pending" | "resubmitted" | "review";
}

const colors = {
  pending: "#F3F4F6",
  review: "#FFF6E5",
  resubmitted: '"#FFEDD5',
};

export const dashboardColumns = [
  {
    accessorKey: "type",
    header: "User Type",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "request_type",
    header: "Request Type",
  },
  {
    accessorKey: "submission_date",
    header: "Submission Date",
    cell: ({ row }: { row: Row<DataType> }) => (
      <ReactTimeAgo date={new Date(row.original.submission_date)} />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: Row<DataType> }) => (
      <Status text={row.original.status} bg={colors[row.original.status]} />
    ),
  },
];
