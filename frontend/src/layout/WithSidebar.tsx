import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/common/Sidebar";
import { RootState } from "../store/store";

const WithSidebar = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarOpen } = useSelector((state: RootState) => state.app);
  return (
    <>
      <Sidebar isSidebarOpen={isSidebarOpen} />

      <main
        className={`absolute top-0 ${
          isSidebarOpen ? "sm:left-[270px]" : "left-0"
        } right-0 bottom-0 m-2 transition-all duration-200 z-10`}
      >
        {children}
      </main>
    </>
  );
};

export default WithSidebar;
