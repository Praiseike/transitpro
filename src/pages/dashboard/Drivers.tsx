import {
  ChangeEvent,
  // forwardRef,
  // useImperativeHandle,
  // useRef,
  useState,
} from "react";
import { ScoreSheet } from "../../components/Scoreboard";
// import Datatable from "../../components/Common/Datatable";
// import {
//   getCoreRowModel,
//   getFilteredRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { dashboardColumns } from "../../tables/dashboardTableColumns";
// import { ScaleLoader } from "react-spinners";
// import UserActions from "../../components/TableActions/UserActions";
import Images from "../../assets/images";
import { SearchInput } from "../../components/Input";
import { TrucksIcon } from "../../assets/icons/Trucks";
import { AddDriverModal } from "./components/AddDriverModal";
import DriverInfo from "./components/DriverInfo";

// const TableSection = forwardRef(({ selection, setSelection }: any, ref) => {
//   const { data, isLoading } = { data: { data: [] }, isLoading: false };

//   useImperativeHandle(ref, () => ({
//     getSelection: () => selection,
//   }));

//   const table = useReactTable({
//     columns: dashboardColumns,
//     data: data?.data,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//   });

//   const renderAction = (close: Function) => {
//     return <UserActions close={close} />;
//   };

//   return (
//     <div className="mt-5">
//       {isLoading ? (
//         <div className="w-full h-[20rem] flex items-center justify-center">
//           <div className="">
//             <ScaleLoader color="#ffcc00" speedMultiplier={1.5} height={30} />
//           </div>
//         </div>
//       ) : (
//         <Datatable {...{ renderAction, selection, setSelection, table }} />
//       )}
//     </div>
//   );
// });

export default function Drivers() {
  // const tableRef = useRef<React.LegacyRef<any>>(null);

  // const [selection, setSelection] = useState<Set<number>>(new Set());
  const [isAddModalOpen, setAddModalOpen] = useState(false); // State to control modal visibility
  const [search, setSearch] = useState('');

  const [isDriverInfoOpen, setIsDriverInfoOpen] = useState(true);

  const driver = {
      image: 'https://via.placeholder.com/400x200', // Replace with actual image URL
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      phone: '+1234567890',
  };

  const openModal = () => {
    setAddModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setAddModalOpen(false); // Close the modal
  };

  const summary = {
    total_drivers: 10,
    total_trucks: 58,
  };

  return (
    <div className="">
      {/* container */}
      <div className="mx-5 ">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-[0.5rem] lg:text-[1.8rem]">Drivers</h1>
          <div className="flex items-center gap-4">
            <SearchInput value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.currentTarget.value)} placeholder="Search" />
            <button
              onClick={openModal}
              className="bg-primary px-5 h-11 rounded flex items-center gap-2"
            >
              <TrucksIcon color="black" />
              <span>Add driver</span>
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
          {/* <TableSection
            selection={selection}
            setSelection={setSelection}
            ref={tableRef}
          /> */}
        </div>
      </div>
      {/* AddDriverModal */}
      <AddDriverModal
        onClose={closeModal}
        isOpen={isAddModalOpen}
        onDriverAdded={() => {
          console.log("Driver added");
          // Refresh logic can go here
        }}
      />

      <DriverInfo
        isOpen={isDriverInfoOpen}
        onClose={() => setIsDriverInfoOpen(false)}
        driver={driver}
      />
    </div>
  );
}
