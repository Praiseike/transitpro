import { Outlet } from "react-router-dom";
import Provider from "../contexts/auth";
// import { Nav } from "../components/Nav";

export const Layout = () => {
    return (
        <div className="">
            <Provider>
                <Outlet />
            </Provider>
        </div>
    );
}