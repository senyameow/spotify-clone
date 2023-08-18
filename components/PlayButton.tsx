import React from 'react'
import { FaPlay } from 'react-icons/fa'

const PlayButton = () => {
  return (
    <button className='transition opacity-0 p-4 bg-green-500 flex itemcs-center justify-center group-hover:opacity-100 rounded-full duration-300 hover:scale-110 translate translate-y-1/2 drop-shadow-lg group-hover:translate-y-0'>
        <FaPlay size={18} className={`text-black`} />
    </button>
  )
}

export default PlayButton