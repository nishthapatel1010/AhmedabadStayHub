import React, { useState } from "react";
import Sidebar from "../components/CommonComponents/Sidebar";
import Navbar from "../components/CommonComponents/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar default open state

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Toggle sidebar visibility
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white p-6 mt-16 h-screen transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full fixed">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Content Area */}
        <div className="flex-grow overflow-auto h-full bg-red-700 rounded-md">
          {/* The Outlet renders the child route content here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
