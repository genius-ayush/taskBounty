'use client'
import React from 'react'
import SidebarButton from './SidebarButton'

function Sidebar() {
  return (
    <aside className='w-[270px] max-w-xs h-screen left-0 top-0 z-40 border-r'>

      <div className='h-full px-3 py-4'>

        <h3 className='mx-3 text-lg font-semibold text-foreground'>
          TaskBounty 
        </h3>

        <div className='mt-5 '>

          <div className='flex flex-col gap-1 w-full'>

            <SidebarButton variant={'default'}/>
            <SidebarButton/>
            <SidebarButton/>
          </div>


        </div>

      </div>

    </aside>
  )
}

export default Sidebar