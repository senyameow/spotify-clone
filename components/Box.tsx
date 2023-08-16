// box is all our layot components

import React from 'react'
import { twMerge } from 'tailwind-merge' // можем несколько стилей совмещать (очень классно короче)


interface BoxProps {
    children: React.ReactNode;
    className?: string
}

const Box = ({children, className} : BoxProps) => {
  return (
    <div className={twMerge('bg-neutral-900 rounded-lg w-full h-fit text-gray-300', className)}>
        {children}
    </div>
  )
}

export default Box