import React from "react";
import Images from "../../assets/images";

export default function TruckActions({ close, row , viewDetails, deleteTruck }: any) {

  const buttons = [
    {
      color: "black",
      handler: viewDetails,
      icon: Images.ActionView,
      name: "View Truck",
    },

    {
      color: "red",
      handler: deleteTruck,
      icon: Images.ActionReject,
      name: "Delete Truck",
    },
  ];

  return (
    <div className="p-5 px-3 relative z-[1000]  bg-white border shadow-2xl rounded">
      <ul className="flex flex-col min-w-[10rem] gap-3">
        {buttons.map((action) => (
          <li className="hover:bg-[#f3f3f3] rounded">
            <button
              style={{ color: action.color }}
              onClick={() => {
                action.handler(row);
                close();
              }}
              className="px-3 flex gap-2 items-center w-full py-2"
            >
              <img src={action.icon} alt="" />
              <span className="text-sm">{action.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
