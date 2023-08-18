'use client'

import useSleep from '@/hooks/useSleep'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

import queryString from 'query-string'
import Input from './Input'

const SearchInput = () => {

    const router = useRouter() // понадобится чтобы рефрешить или куда-то переходить, короче пусть будет
    const [value, setValue] = useState<string>('') // сначала значение у нас пустое, закидывать будем через инпут
    
    const sleepValue = useSleep(value) // будем выводить слип значения, запихиваем туда то, что получили с инпута

    useEffect(() => {
        const query = {
            title: sleepValue
        }

        const url = queryString.stringifyUrl({url: '/search', query: query})

        console.log(url)

        router.push(url)

    }, [router, sleepValue])

    console.log(value)

  return (
    <div>
        <Input placeholder='search a bunch of gorgeous songs..' onChange={e => setValue(e.target.value)} />
    </div>
  )
}

export default SearchInput