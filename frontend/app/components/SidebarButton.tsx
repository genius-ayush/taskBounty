'use-client'
import { Button, ButtonProps } from '@/components/ui/button'
import { LucideIcon, Sun } from 'lucide-react'
import React from 'react'
import {cn} from '@/lib/utils'                              

interface SidebarButtonProps extends ButtonProps{
    icon ?: LucideIcon ; 

}

function SidebarButton({icon : Icon ,className , children , ...props} : SidebarButtonProps) {
  return (
    
    <Button variant='ghost' className={cn('gap-3 justify-start' , className)} {...props}>
        {Icon && <Icon size={24}/>}
        <span className='text-lg font-light'>{children}</span>
    </Button>
  )      
}

export default SidebarButton