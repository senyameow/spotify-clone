'use client'

import SongItem from '@/components/SongItem'
import { Song } from '@/types'
import React from 'react'

interface SongsProps {
    songs: Song[]
}

const PageContent = ({songs} : SongsProps) => {
  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-4 mt-4'>
        {songs.map(song => (
            <SongItem key={song.id} data={song} onClick={() => {}} />
        ))}
    </div>
  )
}

export default PageContent