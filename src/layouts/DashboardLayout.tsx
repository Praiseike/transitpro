import { Outlet } from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar";
import { useAuth } from "../contexts/auth/hooks";

export const DashboardLayout = () => {
    const auth = useAuth();
    console.log(auth)
    return (
        <main className="flex">
            <Sidebar/>
            <div className="grow p-6 mt-8">
                <Outlet/>
            </div>
        </main>
    );
}