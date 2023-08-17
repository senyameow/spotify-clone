import React, { InputHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

// interface InputProps {
//     id: string;
//     placeholder: string;
//     disabled: boolean;
//     [propName : string] : any;
// }

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {} 

//чтобы такую конструкцию заюзать, мы передаем в дженерик сначала HTMLInputElement, а потом сделанный нами интерфейс InputProps

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, disabled, ...props}, ref) => { // такая конструкция дала нам базовые пропсы инпута с коробки (и мы их забираем className, type, disabled), это те, которые нам точно нужны + прокидываем остальные, если чо их тоже заюзаем

    return (
        <input ref={ref} type={type} disabled={disabled} placeholder={props.placeholder} className={twMerge(`rounded-md w-full px-3 py-2 text-xl text-white outline-none file:border-0 border border-transparent bg-neutral-700 file:bg-transparent placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50`, className)} {...props} />
    )
})

export default Input