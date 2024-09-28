"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Wallet, Menu, X, CircleUser, ChevronDown, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useTheme } from "next-themes";
import { SelectTheme } from "./ThemeToggler";
import axios from "axios";
import { useRouter } from "next/navigation";
import Provider from "../provider";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [userName, setUserName] = useState<string | null>(null);
  const token = localStorage.getItem("token");
  const router = useRouter();
  console.log(token);

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem("flag") ; 
    setUserName("") 
    
    router.push("/landingPage");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get(
            "http://localhost:3000/v1/creator/me",
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );

          const data = response.data; 
          console.log(data);

          if (data.username) {
            setUserName(data.username);

            if (data.role == "CREATOR") {
              
              var flag = localStorage.getItem("flag") ; 
              if(flag  == null){
                  localStorage.setItem("flag" , "true") ; 
                   window.location.reload()
              }
             
            router.push("/creatorDashboard");
          }

            
          }
        }
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get(
            "http://localhost:3000/v1/worker/me",
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );

          const data = response.data; 

          if (data.username) {
            setUserName(data.username);

            if (data.role == "WORKER") {
              
              var flag = localStorage.getItem("flag") ; 
              if(flag  == null){
                  localStorage.setItem("flag" , "true") ; 
                   window.location.reload()
              }
             
            router.push("/userDashboard");
          }

            
          }
        }
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };

    fetchData();
  }, [token]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const { theme } = useTheme();
  let darkMode = false;

  if (theme == "dark") {
    darkMode = true;
  } else {
    darkMode = false;
  }
  console.log(theme);

  const NavLinks = () => (
    <>
      {!userName && (
        <>
          <Link
            className={`text-sm font-medium hover:text-purple-400 transition-colors ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
            href="#how-it-works"
          >
            How It Works
          </Link>
          <Link
            className={`text-sm font-medium hover:text-purple-400 transition-colors ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
            href="/authcreator"
          >
            For Creators
          </Link>
          <Link
            className={`text-sm font-medium hover:text-purple-400 transition-colors ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
            href="/authuser"
          >
            For Users
          </Link>
        </>
      )}
    </>
  );

  const UserProfile = () => (
    <div className="flex items-center gap-2">
      <div className="h-6 w-6 text-purple-500" />
      <span
        className={`text-sm font-medium ${
          darkMode ? "text-gray-300" : "text-gray-600"
        } flex gap-1`}
      >

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex gap-2 items-center">
              <CircleUser size={28}/>
              <div>
              {userName}
              </div>
              <div><ChevronDown size={18}/></div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem >
              <div className="flex items-center gap-2"><User size={16}/>{userName}</div></DropdownMenuItem>
            <DropdownMenuItem><div className="flex items-center gap-2"><LogOut size={16}/> <span onClick={handleLogout}>Log out</span></div></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </span>
    </div>
  );

  return (
    <>
    <Provider>
      <header
        className={`px-4 lg:px-6 h-16 flex items-center border-b  ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
        } relative z-50`}
      >
        <Link className="flex items-center justify-center" href="/landingPage">
          <Wallet className="h-6 w-6 text-purple-500" />
          <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            TaskBounty
          </span>
        </Link>
        {isMobile ? (
          <div className="ml-auto flex items-center">
            <SelectTheme />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="w-9 px-0"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        ) : (
          <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
            {userName ? <UserProfile /> : <NavLinks />}
            <SelectTheme />
          </nav>
        )}
      </header>
      {isMobile && mobileMenuOpen && (
        <div
          className={`absolute top-16 left-0 right-0 z-40 ${
            darkMode ? "bg-gray-800" : "bg-white"
          } border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <nav className="flex flex-col items-center py-4 space-y-4">
            {userName ? <UserProfile /> : <NavLinks />}
          </nav>
        </div>
      )}
      </Provider>
    </>
  );
}
