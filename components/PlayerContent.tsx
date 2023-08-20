'use client' // клиент сможет взаимодействовать с этим плеером

// будет инфа о треке + можно лайкнуть его 

// будут управлялки - пауза, скипы вперед назад

// будет настройка громкости



import { Song } from '@/types'
import React, { useEffect, useState } from 'react'
import LibraryItem from './LibraryItem';
import LikeButton from './LikeButton';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import {HiSpeakerWave, HiSpeakerXMark} from 'react-icons/hi2'
import Slider from './Slider';
import usePlayer from '@/hooks/usePlayer';

import useSound from '/Users/senya/spotify-clone/node_modules/use-sound'

interface PlayerContentProps {
    song: Song;
    songURL: string;
}

const PlayerContent = ({song, songURL} : PlayerContentProps) => {

    const player = usePlayer() // берем плеер, чтобы скипать на некст айди, ресетить

    const [volume, setVolume] = useState<number>(1) // для громкости

    const [isPlaying, setIsPlaying] = useState<boolean>(false) // стейт для икнки плэй, которая меняется динамически

    const Icon = isPlaying ? BsPauseFill : BsPlayFill // иконка будет меняться взависимости от того, играет ли трек

    const VolumeIcon = volume===0 ? HiSpeakerXMark : HiSpeakerWave



    const [play, {pause, sound, stop}] = useSound(songURL, {
        volume: volume, // указываем громкость (дефолтная 100% стоит)
        onplay: () => {
            console.log(songURL)
            setIsPlaying(true)
        }, // меняем стейт
        onend: () => {
            setIsPlaying(false)
            onPlayNext()
        },
        onpause: () => {
            setIsPlaying(false)
        },

        format: ['mp3'] // если не ставим mp3, то ничего не услышим
    }) // используем ссылку, которую зафетчили с дб

    useEffect(() => {


        sound?.play()

        return () => {
            sound?.unload(); // удаляет прошлый трек (это спасает нас)
          }
    }, [sound, player.activeId])

    const handlePlay = () => {
        console.log(`gonna play!`)
        if (!isPlaying) {
            console.log('playing!')
            play()
        } else {
            // stop(player.ids[player.ids.findIndex(id => id === player.activeId)])
            pause()
        }
    }  // кнопка плэй

    const handleMute = () => {
        if (volume === 0) {
            setVolume(1)
        } else {
            setVolume (0)
        }
    }

    // функции для скипов

    const onPlayNext = () => {


        if (player.ids.length === 0) return // если айдишников нет в списке нет, то ретерн

        // чтобы включить некст трек, мы должны знать индекс трека в списке айдишников, потому что следующий трек = следующий индекс
        // файндиндекс поможет 
        const currentIndex = player.ids.findIndex(id => id === player.activeId) 
        // мы нажали на трек activeId стал равен айдишнику трека
        // и мы находим индекс трека, который сейчас активный (или потом переключится на активный)

        // следующий трек просто следующий индекс

        const nextSong = player.ids[currentIndex + 1] // но если это последний трек, то гг будет, надо проверить


        if (!nextSong) {
            console.log(player.ids[0], 'im gonna play')
            player.setId(player.ids[0])
            console.log(player.activeId)
            return play()
        }


        player.setId(nextSong)
        console.log(nextSong)
    }
    const onPlayPrev = () => {



        if (player.ids.length === 0) return // если айдишников нет в списке нет, то ретерн

        // чтобы включить некст трек, мы должны знать индекс трека в списке айдишников, потому что следующий трек = следующий индекс
        // файндиндекс поможет 
        const currentIndex = player.ids.findIndex(id => id === player.activeId) 
        // мы нажали на трек activeId стал равен айдишнику трека
        // и мы находим индекс трека, который сейчас активный (или потом переключится на активный)


        // следующий трек просто следующий индекс

        const prevSong = player.ids[currentIndex - 1] // но если это последний трек, то гг будет, надо проверить

        if (!prevSong) {
            return player.setId(player.ids[player.ids.length - 1])
        }



        player.setId(prevSong)
    }

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 w-full'> {/* на мобилках нам не надо иметь управление громкостью, делаем 2 колонки */}
        <div className='flex w-full justify-start flex-1'>
            <div className='flex flex-row items-center gap-x-4'>
                <LibraryItem data={song} onClick={() => {}} no_like = {true} />
                <LikeButton songId={song.id} onClick={() => {}}/>
            </div>
        </div>
        

        <div onClick={() => {}} className='flex md:hidden col-auto w-full justify-end items-center flex-1'> {/* кнопка плэй для мобилок, делаем так, чтобы ее не существовало от мд */}
            <div onClick={handlePlay} className='hover:opacity-[.9] h-10 w-10 flex flex-row items-center justify-center rounded-full bg-white p-1 cursor-pointer'>
                <Icon className={'text-black'} size={30} />
            </div>
        </div> {/* нет дива на пк (плэй для мобилки) */}

        <div className='hidden md:flex items-center justify-center w-full max-w-[722px] gap-x-6'>
            <AiFillStepBackward onClick={onPlayPrev} size={30} className={`text-neutral-400 cursor-pointer hover:text-white transition duration-100`} />
            <div onClick={handlePlay} className='hover:opacity-[.9] h-10 w-10 flex flex-row items-center justify-center rounded-full bg-white p-1 cursor-pointer'>
                <Icon size={30} className={'text-black'} />
            </div>
            <AiFillStepForward onClick={onPlayNext} size={30} className={`text-neutral-400 cursor-pointer hover:text-white transition duration-100`} />
            
        </div> {/* нет дива на мобилке (плэй для пк) */}

        <div className='hidden md:flex w-full justify-end pr-2'>
            <div className='flex flex-row gap-x-2 items-center w-full justify-end'>
                <VolumeIcon onClick={handleMute} size={30} className='cursor-pointer hover:opacity-[.9]' /> {/* при нажатии будет мутить трек */}

                <Slider value={volume} onChange={(value) => setVolume(value!)} /> {/* сделаем регулятор громкости с помощью радикса */}
            </div>
        </div> {/* нет дива на мобилке (громкость) */}

    </div>
  )
}

export default PlayerContent
