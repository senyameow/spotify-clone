'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { twMerge } from 'tailwind-merge';
import {BiRightArrowAlt, BiLeftArrowAlt} from 'react-icons/bi'
import {AiFillHome} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import Button from './Button';
// import Button from './Button';

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header = ({children, className} : HeaderProps ) => {

    // будем юзать руты тут
    const router = useRouter()

    //+ наша приложуха будет с аунтефикацией т.е. будем логиниться и разлогиниватсья

    const logout = () => {
        console.log('qwe')
    }

  return ( 
    <header className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6 `, className)}>
        <div className='w-full flex flex-row justify-between items-center mb-4'>
            <div className='hidden md:flex items-center gap-3'>
                <button className='bg-black rounded-full w-[45px] h-[45px] hover:opacity-[.8] flex justify-center items-center cursor-pointer'>
                    <BiLeftArrowAlt onClick={() => router.back()} size={20} className='text-white' />
                </button> 
                <button className='bg-black rounded-full w-[45px] h-[45px] hover:opacity-[.8] flex justify-center items-center cursor-pointer'>
                    <BiRightArrowAlt onClick={() => router.forward()} size={20} className='text-white' />
                </button>
            </div>

            <div className='flex md:hidden items-center gap-3'>
                <button className='bg-white rounded-full w-[26px] h-[26px] hover:opacity-[.8] flex justify-center items-center cursor-pointer'>
                    <AiFillHome onClick={() => console.log('clicked!')} size={20} className='text-black' />
                </button>
                <button className='bg-white rounded-full w-[26px] h-[26px] hover:opacity-[.8] flex justify-center items-center cursor-pointer'>
                    <BsSearch onClick={() => console.log('clicked!')} size={20} className='text-black' />
                </button>
            </div>

            <div className='flex flex-row gap-3'>
                <Button disabled={false} className='bg-transparent text-white font-medium'>
                    Sign In
                </Button>

                <Button disabled={false} className='bg-white px-6 py-1  font-bold'>
                    Log In
                </Button>
            
            </div>

            

        </div>
        
        <main>{children}</main>

    </header>
  )
}

export default Header