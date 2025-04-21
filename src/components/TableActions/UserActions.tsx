import React from "react";
import Images from "../../assets/images";

export default function UserActions({ close, data = []}: any) {
  
  const viewDetails = () => {}
  const acceptUser = () => {}
  const rejectUser = () => {}

  const buttons = [
    {
      color: "black",
      handler: viewDetails,
      icon: Images.ActionView,
      name: "View User",
    },
    {
      color: "black",
      handler: acceptUser,
      icon: Images.ActionAccept,
      name: "Accept User",
    },
    {
      color: "red",
      handler: rejectUser,
      icon: Images.ActionReject,
      name: "Reject User",
    },
  ];

  return (
    <div className="p-5 z-[100]  bg-white border shadow-2xl rounded">
      <ul className="flex flex-col min-w-[10rem] gap-3">
        {buttons.map((action) => (
          <li className="hover:bg-light rounded">
            <button
              style={{ color: action.color }}
              onClick={() => {
                action.handler();
                close();
              }}
              className="px-3 flex gap-2 items-center w-full py-2"
            >
              <img src={action.icon} alt="" />
              <span>{action.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
