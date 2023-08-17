'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { twMerge } from 'tailwind-merge';
import {BiRightArrowAlt, BiLeftArrowAlt} from 'react-icons/bi'
import {AiFillHome} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import Button from './Button';
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
// import Button from './Button';

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header = ({children, className} : HeaderProps ) => {

    // будем юзать руты тут
    const router = useRouter()

    //+ наша приложуха будет с аунтефикацией т.е. будем логиниться и разлогиниватсья

    
    const {onOpen} = useAuthModal()
    
    // нам надо убрать кнопки и поставить что-то другое, если мы зареганы (как мы это делаем?)
    // надо поймать нашего юзера и supabaseClient
    
    const { user } = useUser()
    const supabaseClient = useSupabaseClient()
    
    const logout = async () => {
        const {error} = await supabaseClient.auth.signOut()
        router.refresh()

        if (error) {
            toast.error('error')
        } else {
            toast.success(`you've successesfully logged out!`)
        }
    } // если мы зареганыЮ естественно мы должны уметь ливать с акка


  return ( 
    <header className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`, className)}>
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

            {user ? (
                <div className='flex items-center gap-6'>
                    <Button click={logout} className='text-black px-6 bg-white'>
                        Logout
                    </Button>
                    <Button click={() => console.log(user)}>
                        <FaUserAlt size={24} />
                    </Button>
                </div>
            ) : <div className='flex flex-row gap-3'>
                <Button click={onOpen} disabled={false} className='bg-transparent text-white font-medium'>
                    Sign In
                </Button>

                <Button click={onOpen} disabled={false} className='bg-white px-6 py-1  font-bold'>
                    Log In
                </Button>
            
            </div>}

            

        </div>
        
        <main>{children}</main>

    </header>
  )
}

export default Header