'use client'
import React from 'react'
import SidebarButton from './SidebarButton'
import { Home } from 'lucide-react'
import { SidebarItems } from '../types';
import Link from 'next/link';

interface SidebarDesktopProps{
  sidebarItems : SidebarItems ; 
}



function Sidebar( props : SidebarDesktopProps) { 
  return (
    <aside className='w-[270px] max-w-xs h-screen left-0 top-0 z-40 border-r'>

      <div className='h-full px-3 py-4'>

        <div className='mt-5 '>

          <div className='flex flex-col gap-9 w-full'>

            {props.sidebarItems.links.map((link , index)=>(
              <Link key={index} href={link.href}>
              <SidebarButton  icon={link.icon} className='w-full'>{link.label}</SidebarButton>
              </Link>
            ))}


        </div>
        </div>
      </div>

    </aside>
  )
}

export default Sidebar