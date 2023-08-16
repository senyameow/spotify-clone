'use client'

import React, {useMemo} from 'react'

import {usePathname} from 'next/navigation'

import {HiHome} from 'react-icons/hi'
import {FiSearch} from 'react-icons/fi'
import Box from './Box'
import Link from 'next/link'
import SidebarItem from './SidebarItem'
import Library from './Library'



interface SidebarProps {
    children: React.ReactNode
}

const Sidebar = ({children} : SidebarProps) => {

    const pathname = usePathname() //returns a string of the current URL's pathname

    const routs = useMemo(() => {
        return [
            {   icon: HiHome,
                label: 'Home',
                active: pathname !== '/search',
                href: '/'
            },
            {   icon: FiSearch,
                label: 'Search',
                active: pathname === '/search',
                href: '/search'
            },
        ]
    }, [pathname])

  return (
    <div className='h-[100vh] flex'>
        <div className='hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2'>
            <Box>
                <div className='flex flex-col gap-5 p-4'>
                    {routs.map(route => (
                            <SidebarItem key={route.label} {...route} /> // all APP!!! DOESN't WORK W/O key PROP!
                    ))}
                </div>
            </Box>
            <Box className='overflow-y-auto h-full'>
                <Library />
            </Box>
        </div>
        

        <main className='w-full h-full'>
            {children}
        </main>
    </div>
  )
}

export default Sidebar