'use client'

import { Song } from '@/types'
import React, {useEffect} from 'react'
import LibraryItem from './LibraryItem'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import useOnPlay from '@/hooks/useOnPlay'

interface LikedContentProps {
    songs: Song[]
}

const LikedContent = ({songs} : LikedContentProps ) => {

    const router = useRouter() // полезная штука

    const {isLoading, user} = useUser()

    const onPlay = useOnPlay(songs) // здесь тоже дают песни - берем

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/')
        } // если чувак нажмет логаут, его кинет домой (потому что если он не в аккаунте, у него нет лайкнутых треков)
    }, [router, user, isLoading])


    if (songs.length === 0) {
        return (
            <div className='flex flex-col w-full text-neutral-400 text-5xl px-6 text-center items-center justify-center'>
                no liked songs yet
            </div>
        )
    }

  return (
    <div className='flex flex-col items-center w-full gap-3 px-3'>
        {songs.map(song => (
            <LibraryItem key={song.id} data={song} onClick={() => onPlay(song.id)} />
        ))}
    </div>
  )
}

export default LikedContent