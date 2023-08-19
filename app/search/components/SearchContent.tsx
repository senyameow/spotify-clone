'use client'
import LibraryItem from '@/components/LibraryItem'
import LikeButton from '@/components/LikeButton'
import useOnPlay from '@/hooks/useOnPlay'
import { Song } from '@/types'
import React from 'react'

interface SearchContentProps {
    songs: Song[]
}

const SearchContent = ({songs} : SearchContentProps) => {

    // в серче тоже дают песни! Сюда сразу прилетает список треков, которые мы искали (только они), что сообственно нам и надо!

    const onplay = useOnPlay(songs)

    if(songs.length === 0) {
        return (
            <div className='text-neutral-400 px-6 w-full '>
                No songs found
            </div>
        )
    }

  return (
    <div className='flex flex-col w-full gap-2 px-6'>
        <div className=''>
            {songs.map(song => (
                <div key={song.id} className='flex flex-row justify-between w-full gap-3'>
                    <LibraryItem data={song} onClick={() => onplay(song.id)} />
                </div>
            ))}
        </div>

    </div>
  )
}

export default SearchContent