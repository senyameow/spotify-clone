import useAuthModal from '@/hooks/useAuthModal'
import React from 'react'

import { forwardRef } from 'react' 
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { click: () => void} // можем брать свои пропсы + берем все пропсы, которые дает нам хтмл сразу от кнопки (МЫ ИХ НЕ ПИШЕМ ВРУЧНУЮ!)

//для того, чтобы так сделать нам нужен forwardRef!



const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled = false,
    type = 'button',
    click,
    ...props
}, ref) => {
    return (
        <button onClick={click} ref={ref} disabled={disabled} type={type} className={twMerge(`w-full min-w-fit rounded-full bg-green-500 border border-transparent p-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-80`, className)}>
            {children}
        </button>
    )
})

export default Button