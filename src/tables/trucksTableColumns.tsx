import { ColumnDef, Row } from "@tanstack/react-table";

interface DataType {
  id: number;
  name: string;
  registration_number: string;
  image_url: string;
  driver: any;
}


export const truckColumns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Truck Brand",
  },
  {
    accessorKey: "registration_number",
    header: "Registration Number",
  },
  {
    accessorKey: "driver",
    header: "Driver assigned",
    cell: ({ row }: { row: Row<DataType> }) => row.original.driver ? row.original.driver?.name : 'Not assigned' 
  },
  {
    accessorKey: "actionss",
    header: "",
  },
];
