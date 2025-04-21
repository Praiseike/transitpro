import React, { ReactNode } from "react";
import Images from "../../assets/images";
import { Link, useLocation } from "react-router-dom";
import { TrucksIcon } from "../../assets/icons/Trucks";
import { DriversIcon } from "../../assets/icons/Drivers";
import { ReviewIcon } from "../../assets/icons/Reviews";
import { SettingsIcons } from "../../assets/icons/Settings";
import { DashboardIcon } from "../../assets/icons/Dashboard";

interface TIconTextOneProps {
  Image: any;
  text: string;
  isActive: boolean;
}

const IconTextOne: React.FC<TIconTextOneProps> = ({ Image, text, isActive }) => (
  <button
    className={`px-4 py-2 items-center font-[300] flex gap-2 outline-none rounded w-full hover:font-semibold ${
      isActive ? "bg-primary font-semibold text-[#000000] " : "text-white"
    }`}
  >
    <Image color={isActive? "black" : "white"}/>
    <span className="inline-block nunito-sans text-nowrap text-[16px]">{text}</span>
  </button>
);

interface SectionProps {
  title: string;
  links: { to: string; image: any; text: string }[];
}

const SidebarSection: React.FC<SectionProps> = ({ title, links }) => {

  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <dl className="mt-20 w-full ">
      <dt className="nunito-sans-500 text-[0.75rem]">{title}</dt>
      <div className="flex w-full flex-col space-y-5 my-5">
        {links.map(({ to, image, text }) => (
          <Link key={to} to={to}>
            <IconTextOne Image={image} text={text} isActive={isActive(to)}/>
          </Link>
        ))}
      </div>
    </dl>
  );
};

const Sidebar: React.FC = () => {
  const sections = [
    {
      title: "",
      links: [
        { to: "/dashboard", image: DashboardIcon, text: "Dashboard" },
        { to: "/dashboard/trucks", image: TrucksIcon, text: "Trucks" },
        { to: "/dashboard/drivers", image: DriversIcon, text: "Drivers" },
      ],
    },

    {
      title: "SUPPORT",
      links: [
        { to: "/reviews", image: ReviewIcon, text: "Reviews" },
        { to: "/settings", image: SettingsIcons, text: "Settings" },
      ],
    },
  ];

  return (
    <div className="w-[18%] h-screen overflow-y-auto relative nunito-sans-400 bg-black">
      <div className="px-8 w-full">
        <img src="/logo.png" alt="" className="w-[10rem] mt-10 mb-12"/>
        {sections.map(({ title, links }) => (
          <SidebarSection key={title} title={title} links={links} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
