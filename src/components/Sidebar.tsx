import { ChevronRightIcon, MenuIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import routes from "@/lib/routes";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isHeaderOpen, setIsHeaderOpen] = useState(true);
  const windowResize = () => {
    if (window.innerWidth > 768) {
      setIsHeaderOpen(true);
    } else {
      setIsHeaderOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", windowResize);
    return () => {
      window.removeEventListener("resize", windowResize);
    };
  }, []);

  return (
    <>
      <nav
        className={`absolute top-0 left-0 h-screen overflow-y-auto bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-900 transition-all duration-300  z-40 ${
          isHeaderOpen ? "w-screen md:w-[300px] lg:w-[400px]" : "!w-0"
        }`}
      >
        <div className="flex flex-col p-10 h-full relative">
          <div className="flex gap-4 items-center">
            <img
              src="https://i.pravatar.cc/300"
              className="w-16 h-16 rounded-full"
            />
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-gray-500 dark:text-gray-400">Premium Member</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-10 ">
            {routes.map((route, i) => (
              <div key={route.path}>
                <NavLink
                  to={route.path}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-blue-900 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400"
                  }
                >
                  <div className="flex justify-between items-center text-xl">
                    <span className="">{route.name}</span>
                    <ChevronRightIcon size={24} className="" />
                  </div>
                </NavLink>
                {i !== routes.length - 1 && (
                  <div className="w-full mt-5 h-px bg-gray-100 dark:bg-gray-700"></div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 absolute top-4 right-4">
            <ThemeToggle />
            {isHeaderOpen && (
              <Button
                variant={"outline"}
                size={"icon"}
                className="md:hidden"
                onClick={() => setIsHeaderOpen(false)}
              >
                <XIcon size={24} />
              </Button>
            )}
          </div>
        </div>
      </nav>
      <Button
        variant={"outline"}
        size={"icon"}
        className={`fixed top-4 right-4 z-50 ${
          isHeaderOpen ? "hidden" : "flex"
        }`}
        onClick={() => setIsHeaderOpen(true)}
      >
        <MenuIcon size={24} />
      </Button>
    </>
  );
};

export default Sidebar;
