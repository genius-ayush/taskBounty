"use client";
import React from "react";
import Sidebar from "../Sidebar";
import { CloudUpload, FolderPlus, History, Home, LayoutDashboard, ListTodo } from "lucide-react";
import { SidebarItems } from "../../types";
import { useTheme } from "next-themes";

const sidebarItems: SidebarItems = {
  links: [
    { label: "Dashboard", href: "/userDashboard/Dashboard", icon: LayoutDashboard },
    { label: "Tasks", href: "/userDashboard/Tasks", icon: ListTodo },
    { label: "History", href: "/userDashboard/History", icon: History },
  ],
};

function UserNavbar() {
  const { theme } = useTheme();
  let darkMode = false;

  if (theme == "dark") {
    darkMode = true;
  } else {
    darkMode = false;
  }
  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Sidebar sidebarItems={sidebarItems} />
    </div>
  );
}

export default UserNavbar;
