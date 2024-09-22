'use client'
import React, { useEffect } from 'react'
import LandingPage from './landingPage/page'
// import Header from './components/header'
// import LandingPage2 from './components/landingPage'
import { useState } from 'react'
import { useTheme } from "next-themes"
import AuthPage from './components/AuthCreator'
import Sidebar from './components/Sidebar'
// import { SelectTheme } from './components/ThemeToggler'

function page() {

  // const [darkMode , setDarkMode] = useState(true) ; 
  
  const { theme } = useTheme();
  let darkMode = false ; 

  if(theme == 'dark'){
    darkMode = true ; 
  }else{
    darkMode = false ; 
  }
  console.log(theme) ; 

  // useEffect(()=>{
  //   if(darkMode){
  //     document.documentElement.classList.add('dark') ; 
  //   }else{
  //     document.documentElement.classList.remove('dark'); 
  //   }
  // } , [darkMode])

    
  return (
    <>
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
    {/* <LandingPage/> */}
    {/* <AuthPage/> */}

    <Sidebar/>
    </div>
    </>
  )
}


export default page