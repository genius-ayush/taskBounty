import { Button, ButtonProps } from '@/components/ui/button'
import { LucideIcon, Sun } from 'lucide-react'
import React from 'react'

interface SidebarButtonProps extends ButtonProps{
    icon ?: LucideIcon ; 

}

function SidebarButton({icon : Icon ,className , ...props} : SidebarButtonProps) {
  return (
    
    <Button variant='ghost' className='gap-2 justify-start' {...props}>
        {Icon && <Icon/>}
        <span>Dark Mode</span>
    </Button>
  )
}

export default SidebarButton