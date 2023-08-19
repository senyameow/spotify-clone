'use client' // будем использовать этот хук в client компоненте
import { Song } from "@/types"

import { useSessionContext } from "@supabase/auth-helpers-react"
// when fetching data client-side, you need to make sure to use the supabaseClient from the useSupabaseClient

import { useEffect, useState } from "react" // стейты нужны + юзэффект для фетчинга
import { toast } from "react-hot-toast" // для уведов
import { useUser } from "./useUser"


const useGetSongById = (id: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [song, setSong] = useState<Song | undefined>(undefined)

    const user = useUser() // клиентский фетч, только когда юзер зарегался, поэтому берем юзера

    const {supabaseClient} = useSessionContext() // берем клиент

    // думаем, как получать дату...

    useEffect(() => {

    // сначала хендлим ситуацию, если айдишник не прилетел
        if (!id) return  

        // создаем функцию, которая будет фетчить дату

        const fetchData = async () => {

            setIsLoading(true)

            const {data, error} = await supabaseClient.from('songs').select('*').eq('id', id)

            // хендлим ошибки фетча

            if (error) {
                setIsLoading(false) // останавливаем загрузку
                return toast.error(error.message)
            }


            setSong(data[0] as Song)

            setIsLoading(false)
            // если ошибки не было, то ...

        

        } 

    if (user) {
        fetchData()
    }

    // only run your query once the user is defined client-side in the useUser() hook

    if (!user) return


    }, [id, supabaseClient, user])

    return ({song, isLoading})
    // мб нужно useMemo
}

export default useGetSongById;