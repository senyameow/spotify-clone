import Link from 'next/link';
import React from 'react'
import {IconType} from 'react-icons'
import { twMerge } from 'tailwind-merge';

interface SidebarItemProps {
    label: string;
    active?: boolean;
    icon: IconType;
    href: string;
    className ?: string;

}

const SidebarItem = ({label ,active , icon : Icon ,href , className} : SidebarItemProps) => {
  return (
    
        <Link href={href} className={twMerge(`cursor-pointer flex flex-row gap-4 items-center text-neutral-400 hover:text-white transition-colors duration-300 pl-5`, className)}>
            <Icon className={`${active && 'text-white'}`} />
            <span className={`${active && 'text-white'}`}>{label}</span>
        </Link>
    
  )
}

export default SidebarItem