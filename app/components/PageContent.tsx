'use client'

import SongItem from '@/components/SongItem'
import useOnPlay from '@/hooks/useOnPlay'
import { Song } from '@/types'
import React from 'react'

interface SongsProps {
    songs: Song[]
}

const PageContent = ({songs} : SongsProps) => {

  const onPlay = useOnPlay(songs) // нам поступили треки сюда (здесь все треки), т.е. наш плейлист заполнится всеми треками

  // в хук передали треки, которые будут играть

  if (songs.length === 0) {
    return (
      <div className='mt-4 flex justify-center items-center text-neutral-400 text-3xl'>No Songs Available</div>
    )
  }

  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-4 mt-4'>
        {songs.map(song => (
            <SongItem key={song.id} data={song} onClick={() => onPlay(song.id)} /> // в онплей передали айдишник песни, на которую нажали (мега кайф)
        ))}
    </div>
  )
}

export default PageContent