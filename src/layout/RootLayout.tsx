import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="ml-0 md:ml-[300px] lg:ml-[400px] overflow-y-auto py-8 px-8 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
