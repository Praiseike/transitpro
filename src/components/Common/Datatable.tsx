import { ReactNode, useEffect, useState } from "react";
import Images from "../../assets/images";
import { Column, flexRender, Row, Table } from "@tanstack/react-table";

interface StatusProp {
  bg: string;
  text: string;
}
export function Status({ text, bg }: StatusProp) {
  return (
    <div
      className="rounded-2xl text-center w-24 py-[1px]"
      style={{ backgroundColor: `${bg}` }}
    >
      {text}
    </div>
  );
}

interface DatatableProps {
  table: Table<any>;
  selection: Set<number>;
  setSelection: (selection: Set<number>) => void;
  renderAction: (closeAction: () => void, row: Row<any>) => ReactNode;
}

export default function Datatable({
  table,
  selection,
  setSelection,
  renderAction,
}: DatatableProps) {
  const [markAll, setMarkAll] = useState(false);

  const getMarkState = (id: number) =>
    selection.has(id) ? Images.checkedBox : Images.uncheckedBox;

  const handleMarkAll = () => {
    setMarkAll(!markAll);
    const ids = table.getRowModel().rows.map((row) => row.original.id);
    setSelection(markAll ? new Set() : new Set(ids));
  };

  const onSelect = (id: number) => {
    const updatedSelection = new Set(selection);
    selection.has(id) ? updatedSelection.delete(id) : updatedSelection.add(id);
    setSelection(updatedSelection);
  };

  useEffect(() => {
    const ids = table.getRowModel().rows.map((row) => row.original.id);
    setMarkAll(selection.size > 0 && selection.size === ids.length);
  }, [selection, table]);

  const TableRow = ({ row }: { row: Row<any> }) => {
    const [actionOpen, setActionOpen] = useState(false);

    const closeAction = () => setActionOpen(false);

    return (
      <tr key={row.id} className="h-[40px] text-sm">
        <td
          className="pl-[20px] py-4 cursor-pointer"
          onClick={() => onSelect(row.original.id)}
        >
          <img
            className="w-[0.99rem]"
            src={getMarkState(row.original.id)}
            alt=""
          />
        </td>
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id} className="capitalize">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
        <td className="relative">
          <button
            className="outline-none"
            onClick={() => setActionOpen(!actionOpen)}
          >
            <img src={Images.dotsIcon} alt="Actions" />
          </button>
          {actionOpen && (
            <>
              <div
                onClick={closeAction}
                className="fixed inset-0"
              ></div>
              <div
                style={{
                  opacity: actionOpen ? 1 : 0,
                  top: actionOpen ? 10 : -10,
                }}
                className="absolute transition-all duration-300 -left-32"
              >
                {renderAction(closeAction, row)}
              </div>
            </>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div>
      <table className="border w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="h-[40px] bg-light" key={headerGroup.id}>
              <th onClick={handleMarkAll} className="pl-[20px] cursor-pointer">
                <img
                  className="w-[0.99rem]"
                  src={markAll ? Images.checkedBox : Images.uncheckedBox}
                  alt=""
                />
              </th>
              {headerGroup.headers.map((header) => (
                <th className="w-[%] text-start py-4" key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
              <th className="text-start">Action</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} row={row} />
          ))}
        </tbody>
      </table>
      <div className="mt-5 flex space-x-5 justify-end">
        <div className="flex space-x-1">
          <img src={Images.leftArrowIcon} alt="" />
          <button>Previous</button>
        </div>
        <div className="flex space-x-1">
          <button>Next</button>
          <img src={Images.rightArrowIcon} alt="" />
        </div>
      </div>
    </div>
  );
}