'use client'
import React from 'react'
import {BsMusicNoteBeamed} from 'react-icons/bs'
import {AiOutlinePlus} from 'react-icons/ai'
import { useUser } from '@/hooks/useUser' 
import useAuthModal from '@/hooks/useAuthModal'
import useUploadModal from '@/hooks/useUploadModal'

const Library = () => {

    const { user } = useUser()
    const {onOpen : onOpenAuth} = useAuthModal()

    const {onOpen : onOpenUpload} = useUploadModal()

    const handleClick = () => {
        if (!user) {
            onOpenAuth()
        } else {
            onOpenUpload()
            console.log('nicenice')
        } // сначала проверяем, регнулся ли чел
    }

  return (
    <div className='py-2 px-3 flex flex-col'>
        <div className='flex w-full justify-between items-centertext-neutral-400'>
            <div className='flex flex-row items-center gap-x-3'>
                <BsMusicNoteBeamed size={24} />
                <span>Your Library</span>
            </div>
            <AiOutlinePlus onClick={handleClick} size={24} className={'hover:text-white cursor-pointer'} />
        </div>
        <div className='flex flex-col gap-y-2 mt-4 px-3 text-white'>
            List of songs
        </div>
    </div>
  )
}

export default Library