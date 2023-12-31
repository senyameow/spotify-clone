'use client'
// liked song
import React, {useEffect} from 'react'
import { useRouter } from 'next/navigation';
import {AiFillHeart} from 'react-icons/ai'
import Button from './Button';
import {FaPlay} from 'react-icons/fa'
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';

interface ListItemProps {
    name: string;
    href: string;
}

const ListItem = ({name, href} : ListItemProps) => {

  //нажимаем на тречок, нас кидает на другую страницу, (раутер) 

  const router = useRouter()

  const {user, isLoading} = useUser()

  const authModal = useAuthModal()

  // но мы не можем дать послушать тречок челику, который не зарегался еще, поэтомц будем сначала проверять на аунтефикацию, если пролходит, то выполняем логику




  const handleClick = () => {
    if (!user && !isLoading) {
      authModal.onOpen()
    }

    router.push(href)


  }
  return (
    <button onClick={handleClick} className='group flex items-center relative rounded-md overflow-hidden bg-neutral-100/10 hover:bg-neutral-100/20 cursor-pointer'>
      <div>
        <div className='p-5 flex items-center justify-center bg-gradient-to-br from-purple-400'>
          <AiFillHeart size={20} />
        </div>
        
      </div>
      <span className='ml-2 sm:inline md:hidden lg:inline'>
          {name}
      </span>

      <Button click={() => handleClick()} disabled={false} className={`bg-green-500 flex justify-center items-center text-black rounded-full absolute top-[50%] right-[10%] -translate-y-1/2 w-[42px] h-[42px] hover:scale-110 transition duration-200 opacity-0 drop-shadow-md group-hover:opacity-100`}>
        <FaPlay size={18} className={``} />
      </Button>
    </button>
  )
}

export default ListItem