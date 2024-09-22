'use client'
import Link from 'next/link'
import React from 'react'
import { useTheme } from "next-themes"

export default function Navbar() {

    const { theme } = useTheme();
    let darkMode = false ; 
  
    if(theme == 'dark'){
      darkMode = true ; 
    }else{
      darkMode = false ; 
    }
    // console.log(theme) ; 
  return (
    <footer className={`flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
      © 2024 TaskBounty. All rights reserved.
    </p>
    <nav className="sm:ml-auto flex gap-4 sm:gap-6">
      <Link className={`text-xs hover:underline underline-offset-4 ${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500 hover:text-purple-600'}`} href="#">
        Terms of Service
      </Link>
      <Link className={`text-xs hover:underline underline-offset-4 ${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500 hover:text-purple-600'}`} href="#">
        Privacy
      </Link>
    </nav>
  </footer>
  )
}

