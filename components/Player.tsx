'use client'
import useGetSongById from '@/hooks/useGetSongById'
import useLoadSong from '@/hooks/useLoadSong'
import usePlayer from '@/hooks/usePlayer'
import { Song } from '@/types'
import React from 'react'
import PlayerContent from './PlayerContent'

//возникает трабл, мы хотим зафетчить треки, но все экшены у нас на сервере, а этот компонент клиентский (юзер может нажимать и т.д. поэтому точно client)
// т.е. если мы заюзаем какой-то сервер хук тут, будет ошибка

// как тогда поступать?
// супабаза нам дает возможность фетчить дату на клиентских компонентах

// что вообще будет рендериться в компоненте?
// будет штука внизу, в которой трек, который сейчас играет
// т.е. нам надо получать этот трек
// но мы можем взаимодействовать с плеером, значит это use client
// значит фетчить с помощью сервера не получится
// значит надо делать новый клиентский хук, с помощью которого мы сможем забирать трек, который сейчас играет
// т.е. 1 трек по айдишнику
// айдишник будем брать из activeId
// айдишник в activeId будем кидать с помощью функции setIds (при нажатии на трек, просто записываем айдишник туда)
// в хук передаем айдишник активного трека, он его фетчит, все довольны

const Player = () => {

  const player = usePlayer()

  const { song } = useGetSongById(player.activeId) // вызвали хук, в который засунули айдишник из стора и взяли оттуда song (еще есть isLoading)

  // теперь у нас есть song_path, который лежит в song

  // с помозью него мы можем зафетчить из дб песню (то же самое как с картинкой)

  const songURL = useLoadSong(song!) // '!' is a way to tell the compiler "this expression cannot be null or undefined here
  // so don't complain about the possibility of it being null or undefined

  // хендлим ситуацию, когда нехрена не выбрано, или что-то пошло не так, короче фетча не произошло

  if (!song || !songURL || !player.activeId) {
    console.log('there is no song')
    return null
  } // не будем же мы постоянно держать этот плеер внизу, даже если мы ничего не хотели слушать


  // теперь надо сделать так, чтобы мы могли добавить айдишники
  // сделаем хук, который будет этим заниматься

  return (
    <div className='fixed bottom-0 h-[80px] p-6 flex flex-row bg-black group items-center justify-between w-full'>
      <PlayerContent
        key={song.id} // когда key меняется у компонента, то компонент разрушается
        // При изменении ключа компонент будет размонтирован, а затем снова смонтирован
        // ключ, позволит нам скипать на некст трек (размонтирует старый трек и смонтирует на новый трек)
        song={song}
        songURL = {songURL} // передаем ссылку на трек, будем ее использовать в useSound
       />
    </div>
  )
}

export default Player