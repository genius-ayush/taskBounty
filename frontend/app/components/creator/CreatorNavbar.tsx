"use client";
import React from "react";
import Sidebar from "../Sidebar";
import { CloudUpload, FolderPlus, Home, LayoutDashboard } from "lucide-react";
import { SidebarItems } from "../../types";
import { useTheme } from "next-themes";
import Provider from "@/app/provider";

const sidebarItems: SidebarItems = {
  links: [
    { label: "Dashboard", href: "/creatorDashboard/Dashboard", icon: LayoutDashboard },
    { label: "Uploaded Tasks", href: "/creatorDashboard/Uploadtask", icon: CloudUpload },
    { label: "Create Task", href: "/creatorDashboard/Createtask", icon: FolderPlus },
  ],
};

function CreatorNavbar() {
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

export default CreatorNavbar;
