'use client'
import LibraryItem from '@/components/LibraryItem'
import { Song } from '@/types'
import React from 'react'

interface SearchContentProps {
    songs: Song[]
}

const SearchContent = ({songs} : SearchContentProps) => {

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
                <LibraryItem data={song} onClick={() => {}} />
            ))}
        </div>
    </div>
  )
}

export default SearchContent