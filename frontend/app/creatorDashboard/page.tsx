'use client'
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Home } from "lucide-react";
import Creator from "../components/creatorDashboard";
import { useTheme } from "next-themes";
import Dashboard from "../components/Dashboard";
import UploadTasks from "../components/UploadTasks";
import CreateTasks from "../components/CreateTasks";

function page() {
  const { theme } = useTheme();
  const [currentSection, setCurrentSection] = useState("dashboard");
  let darkMode = false;

  if (theme == "dark") {
    darkMode = true;
  } else {
    darkMode = false;
  }

  

  return (
    <div
      className={`flex min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* <Creator /> */}
      <Dashboard/>
    </div>
  );
}

export default page;
