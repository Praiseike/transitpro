import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ScoreSheet } from "../../components/Scoreboard";
import Datatable from "../../components/Common/Datatable";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { dashboardColumns } from "../../tables/dashboardTableColumns";
import { ScaleLoader } from "react-spinners";
import UserActions from "../../components/TableActions/TruckActions";
import Images from "../../assets/images";


const TableSection = forwardRef(({ selection, setSelection }: any, ref) => {
  const { data, isLoading } = { data: { data: [] }, isLoading: false }

  useImperativeHandle(ref, () => ({
    getSelection: () => selection,
  }));

  const table = useReactTable({
    columns: dashboardColumns,
    data: data?.data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const renderAction = (close: Function) => {
    return <UserActions close={close} />;
  };

  return (
    <div className="mt-5">
      {isLoading ? (
        <div className="w-full h-[20rem] flex items-center justify-center">
          <div className="">
            <ScaleLoader color="#ffcc00" speedMultiplier={1.5} height={30} />
          </div>
        </div>
      ) : (
        <Datatable {...{ renderAction, selection, setSelection, table }} />
      )}
    </div>
  );
});

export default function Dashboard() {
  const tableRef = useRef<React.LegacyRef<any>>(null);

  const [selection, setSelection] = useState<Set<number>>(new Set());

  const summary = {
    total_drivers: 10,
    total_trucks: 58
  }

  return (
    <div className="">
      {/* container  */}
      <div className="mx-5 ">
        <h1 className="mt-5 text-[0.5rem] lg:text-[2rem]">Dashboard</h1>
        <div className="mt-5 flex items-center gap-16">
          <ScoreSheet
            icon={Images.totalUserIcon}
            title="TOTAL TRUCKS"
            value={summary?.total_trucks || 0}
          />
          <div className="h-10 w-[1px] bg-light"></div>
          <ScoreSheet
            icon={Images.businessIcon}
            title="TOTAL DRIVERS"
            value={summary?.total_drivers || 0}
          />
        </div>
        <div className="mt-10">

          <TableSection
            selection={selection}
            setSelection={setSelection}
            ref={tableRef}
          />
        </div>
      </div>
    </div>
  );
}
