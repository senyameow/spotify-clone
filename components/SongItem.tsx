'use client'

import { Song } from '@/types'
import React from 'react'

import useLoadImage from '@/hooks/useLoadImage'
import Image from 'next/image';
import PlayButton from './PlayButton';

interface SongItemProps {
    data: Song;
    onClick: (id: string) => void;
}



const SongItem = ({data, onClick} : SongItemProps) => {

    const imageURL = useLoadImage(data)?.publicUrl


  return (
    <div onClick={() => console.log(data)} className='relative group flex flex-col justify-center rounded-md bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition duration-300 p-3  '>
        <div className='relative rounded-md aspect-square w-full h-full overflow-hidden'>
            <Image className='object-cover aspect-square' src={imageURL || 'https://100biografiy.ru/wp-content/uploads/2021/12/Snimok-ekrana-2021-12-25-v-13.43.16.jpg'} alt='image' width={300} height={300}/>
        </div>

        <div className='flex flex-col items-start gap-2 p-1 pt-4 pl-3'>
            <p className='text-white font-bold text-[1.2rem]'>
                {data.title}
            </p>
            <p className='text-white font-normal text-[.7rem]'>
                {data.author}
            </p>
        </div>

        <div className='absolute bottom-24 right-5'>
            <PlayButton />
        </div>
    </div>
  )
}

export default SongItem