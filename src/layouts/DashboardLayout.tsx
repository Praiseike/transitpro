import { Outlet } from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar";

export const DashboardLayout = () => {
    return (
        <main className="flex">
            <Sidebar/>
            <div className="grow p-6 mt-8">
                <Outlet/>
            </div>
        </main>
    );
}