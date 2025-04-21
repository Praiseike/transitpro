import React, {
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useMemo,
  Suspense,
} from "react";
import { ScoreSheet } from "../../components/Scoreboard";
import Datatable from "../../components/Common/Datatable";
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { truckColumns } from "../../tables/trucksTableColumns";
import { ScaleLoader } from "react-spinners";
import TruckActions from "../../components/TableActions/TruckActions";
import Images from "../../assets/images";
import { SearchInput } from "../../components/Input";
import { TrucksIcon } from "../../assets/icons/Trucks";
import useFetcher from "../../hooks/useFetcher";
import { useQuery } from "@tanstack/react-query";
import { queryURLs } from "../../constants";

// Lazy load modals
const AddTruckModal = React.lazy(() => import("./components/AddTruckModal"));
const TruckInfo = React.lazy(() => import("./components/TruckInfo"));



const TableSection = forwardRef(({ selection, setSelection, action }: any, ref) => {
  
  const fetcher = useFetcher();

  const trucksQuery = useQuery({
    queryKey: ['trucks'],
    queryFn: async () => {
      const response = await fetcher.get(queryURLs.TRUCKS);
      return response.data;
    },
  })

  const data = trucksQuery.data?.data?.data || []

  useImperativeHandle(ref, () => ({
    getSelection: () => selection,
  }));

  const memoizedColumns = useMemo(() => truckColumns, []);

  const table = useReactTable({
    columns: memoizedColumns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const renderAction = (close: Function, row: any) => {
    return action(row.original);
  };

  return (
    <div className="mt-5">
      {trucksQuery.isLoading ? (
        <div className="w-full h-[20rem] flex items-center justify-center">
          <ScaleLoader color="#ffcc00" speedMultiplier={1.5} height={30} />
        </div>
      ) : (
        <Datatable {...{ renderAction, selection, setSelection, table }} />
      )}
    </div>
  );
});

export default function Trucks() {
  const tableRef = useRef<React.LegacyRef<any>>(null);

  const [selection, setSelection] = useState<Set<number>>(new Set());
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [truckInfo, setTruckInfo] = useState({
    open: false,
    data: null,
  });

  const [search, setSearch] = useState("");


  // Debounce search input
  const handleSearchChange = useMemo(() => {
    let timeout: NodeJS.Timeout;
    return (e: ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timeout);
      const value = e.target.value;
      timeout = setTimeout(() => setSearch(value), 300);
    };
  }, []);

  const openModal = () => {
    setAddModalOpen(true);
  };

  const closeModal = () => {
    setAddModalOpen(false);
  };

  const showInfo = (data: any) => {
    console.log(data)
    setTruckInfo({
      open: true,
      data: data,
    });
  };

  const closeInfo = () => {
    setTruckInfo({ open: false, data: null });
  };

  const summary = {
    total_drivers: 10,
    total_trucks: 58,
  };

  const action = (row: any) => <TruckActions deleteTruck={() => null} viewDetails={showInfo} close={close} row={row} />

  return (
    <div className="">
      {/* container */}
      <div className="mx-5 ">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-[0.5rem] lg:text-[1.8rem]">Trucks</h1>
          <div className="flex items-center gap-4">
            <SearchInput
              value={search}
              onChange={handleSearchChange}
              placeholder="Search"
            />
            <button
              onClick={openModal}
              className="bg-primary px-5 h-11 rounded flex items-center gap-2"
            >
              <TrucksIcon color="black" />
              <span>Add truck</span>
            </button>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-16">
          <ScoreSheet
            icon={Images.totalUserIcon}
            title="TOTAL DRIVERS"
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
            action={action}
            ref={tableRef}
          />
        </div>
      </div>

      {/* Lazy-loaded Modals */}
      <Suspense fallback={<div>Loading...</div>}>
        <AddTruckModal
          onClose={closeModal}
          isOpen={isAddModalOpen}
          onTruckAdded={() => {
            console.log("truck added");
          }}
        />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <TruckInfo
          isOpen={truckInfo.open}
          onClose={closeInfo}
          truck={truckInfo.data}
        />
      </Suspense>
      
    </div>
  );
}