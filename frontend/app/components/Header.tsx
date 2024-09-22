'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Wallet, Menu, X } from "lucide-react"
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useTheme } from "next-themes"
import { SelectTheme } from "./ThemeToggler"



export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

      
  const { theme } = useTheme();
  let darkMode = false ; 

  if(theme == 'dark'){
    darkMode = true ; 
  }else{
    darkMode = false ; 
  }
  console.log(theme) ; 

  const NavLinks = () => (
    <>
      <Link className={`text-sm font-medium hover:text-purple-400 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} href="#how-it-works">
        How It Works
      </Link>
      <Link className={`text-sm font-medium hover:text-purple-400 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} href="/authcreator">
        For Creators
      </Link>
      <Link className={`text-sm font-medium hover:text-purple-400 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} href="/authuser">
        For Users
      </Link>
    </>
  )

  return (
    <>
      <header className={`px-4 lg:px-6 h-16 flex items-center border-b  ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} relative z-50`}>
        <Link className="flex items-center justify-center" href="/landingPage">
          <Wallet className="h-6 w-6 text-purple-500" />
          <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            TaskBounty
          </span>
        </Link>
        {isMobile ? (
          <div className="ml-auto flex items-center">
            
            <SelectTheme/>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="w-9 px-0"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        ) : (
          <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
            <NavLinks />
            <SelectTheme/>
          </nav>
        )}
      </header>
      {isMobile && mobileMenuOpen && (
        <div className={`absolute top-16 left-0 right-0 z-40 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <nav className="flex flex-col items-center py-4 space-y-4">
            <NavLinks />
          </nav>
        </div>
      )}
    </>
  )
}