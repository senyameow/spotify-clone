'use client'


import useUploadModal from "@/hooks/useUploadModal"
import Modal from "./Modal"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form"
import { useUser } from "@/hooks/useUser"
import Input from "./Input"
import Button from "./Button"
import { toast } from "react-hot-toast"
import { useState } from "react"

import uniqid from 'uniqid'
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { supabase } from "@supabase/auth-ui-shared"

import {useRouter} from 'next/navigation'

const UploadModal = () => {

    const router = useRouter()

    const {isOpen, onClose} = useUploadModal()
    const supabaseClient = useSupabaseClient()

    const {register, handleSubmit, reset} = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        }
    })

    const [isLoading, setIsLoading] = useState(false)

    // зачем ваще мы все это пишем?
    // у нас будет форма, в которую мы будем вносить author, title, загружать song и image файлы
    // чтобы это было проще сделать мы воспользуемся хуком useForm, который облегчае валидацию форм
    // из юзформ забираем register, handleSubmit, reset
    // с помощью регистра регистрируем инпуты, handleSubmit делает валидацию, reset сбрасывает поля
    // в defaultValues записали те поля, которые будут изменяться динамически

    //закину сюда пример работы с этим хуком в синк и асинк



// import React from "react"
// import { useForm, SubmitHandler } from "react-hook-form"


// type FormValues = {
//   firstName: string
//   lastName: string
//   email: string
// }           0. дали типы на все поля формы


// export default function App() {
//   const { register, handleSubmit } = useForm<FormValues>()         1. ВЗЯЛИ
//   const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)            2. сделали onSubmit с нужным для него типом


//   return ( 
//     <form onSubmit={handleSubmit(onSubmit)}>          3. обернули onSubmit в handleSubmit
//       <input {...register("firstName")} />
//       <input {...register("lastName")} />
//       <input type="email" {...register("email")} />        4. зарегали какие-то поля


//       <input type="submit" />         5. есть кнопка сабмит
//     </form>
//   )
// }


// та же самая фигня и с асинхронным onSubmit, просто делаем его async, если нужен await внутри и все так же работает

// как раз наша ситуация, где нужно хендлить await (т.к. будем загружать картинку и песню => надо сначала ждать пока загрузится, а потом уже отправлять)





    const onChange = (open : boolean) => {
        if (!open) {
            reset() // короче каждый раз у нас будет пустая форма
            onClose()
        }
    }

    const {user} = useUser()


    const onSubmit : SubmitHandler<FieldValues> = async (values) => { // теперь у нас есть доступ к defaultValues, которые сейчас в values
        // here we have to upload song to a supabase

        try {
            setIsLoading(true)

            // тут надо описать логику загрузок

            // 1. принимаем инпуты
            console.log(values)
            const songFile = values.song?.[0]
            const imageFile = values.image?.[0]
            console.log(isLoading)
            if (!imageFile || !songFile || !user) {
                toast.error('missing fields')
                
            }

            const uniqueID = uniqid() // сделаем уникальное id (для безопасного стора)

            //upload song

            const {
                data: songData,
                error: songError,
            } = await supabaseClient.storage.from('songs').upload(`song-${values.title}-${uniqueID}`,songFile)

            if (songError) {
                setIsLoading(false)
                return toast.error('failed song upload')
            }

            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient.storage.from('images').upload(`image-${values.title}-${uniqueID}`, imageFile) // без расширения

            if (imageError) {
                setIsLoading(false)
                console.log(imageError)
                return toast.error('failed image upload')
            }

            // первый параметр upLoad - path, по которому, мы будем брать данные из бакетов


            // и загружаем дату в таблицу с кайфом
            console.log(values.title, values.author, songData.path, imageData.path, user?.id)

            const { error: supabaseError } = await supabaseClient.from('songs').insert({
                title: values.title,
                author: values.author,
                song_path: songData.path, // upload уже вернул path, и засторил его в data проперти
                image_path: imageData.path

            })

            if (supabaseError) {
                setIsLoading(false)
                return toast.error(supabaseError.message) // можно вот так выводить смску об ошибке
            }
            
            router.refresh()


            toast.success('song created!')
            

        } catch (error : any) {
            toast.error('something went wrong')
        } finally{
            setIsLoading(false)
            onClose()
            reset()
        }

        
    }



    return (
        <Modal isOpen={isOpen} onChange={onChange} description="Upload a new song" title="make your day">
            <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col gap-y-4`}>
                <Input id='title' disabled={isLoading} {...register('title', {required: true})} placeholder='song title' />
                <Input id='author' disabled={isLoading} {...register('author', {required: true})} placeholder='author name' />

                <div>
                    <div className="pb-1 cursor-pointer">
                        Select a song
                    </div>
                    <Input accept=".mp3" id='song' type="file" disabled={isLoading} {...register('song', {required: true})}/>
                </div>
                <div>
                    <div className="pb-1 cursor-pointer">
                        Select an image
                    </div>
                    <Input accept="image/*" id='image' type="file" disabled={isLoading} {...register('image', {required: true})}/>
                </div>

                <Button disabled={isLoading} type="submit" click={() => console.log('clicked')}>Create</Button>
            </form>
        </Modal>
    )
}

export default UploadModal; 