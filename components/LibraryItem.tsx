import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types';
import Image from 'next/image';
import React from 'react'
import LikeButton from './LikeButton';

interface LibraryProps {
    onClick: (id : string) => void;
    data: Song;
}

// будем выводить картинку + название
// чтобы вывести картинку, нам надо получить ее юрл =)

const LibraryItem = ({onClick, data} : LibraryProps) => {

    const imageURL = useLoadImage(data)?.publicUrl

    const handleClick = () => {
        if (onClick) {
            return onClick(data.id)
        }
    }

  return (
    <div className='flex flex-row justify-between w-full items-center  p-2 text-white cursor-pointer rounded-md hover:bg-neutral-800'>
        <div onClick={handleClick} className='flex flex-row items-center gap-x-3 p-2 text-white w-full cursor-pointer rounded-md hover:bg-neutral-800'>
            <div className='relative rounded-md min-w-[48px] min-h-[48px] overflow-hidden'> 
                <Image fill src={imageURL || ''} alt='song-image' className='object-cover rounded' />
            </div>
            <div className='flex flex-col gap-y-1 overflow-hidden'>
                <span className='text-white truncate text-xl text-bold'>{data.title}</span>
                <span className='text-sm text-neutral-400'>{data.author}</span>
            </div>
        </div>

        <LikeButton songId={data.id} onClick = {() => console.log(data.id)} />
    </div>
  )
}

export default LibraryItem