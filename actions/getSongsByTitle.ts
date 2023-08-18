import { Song } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import getSongs from "./getSongs"

// функция для серчинга песней по названию



const getSongsByTitle = async (title : string) : Promise<Song[]> => {

    const supabase = createServerComponentClient({
        cookies: cookies
    }) // делаем на сервере

    if (!title) { // сразу думаем, а что если чувак не написал ничего? и засерчил = все песни
        const allSongs = await getSongs() // воспользуемся нашей функцией и заберем все песни
        return allSongs;
    }

    

    // const {data, error} = await supabase.from('songs').select('*').eq('title', title) // можно и так, но это очень плохой алгоритм


    const {data, error} = await supabase.from('songs').select('*').ilike('title', `%${title}%`).order('created_at' , {ascending:false}) // а вот это уже по батински



    // зафетчили дату с таблички songs

    if (error) {
        console.log(error)
    }


    return data as any || []
}

export default getSongsByTitle;