// import { useUser } from "@/hooks/useUser" я хотел с помощью этого хука получить user, но некст послал меня 
// выдавал ошибку, что я юзаю стейты на сервере (в useUser)
// я тогда просто обращаемся к сессии и забираем ее
import { Song } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"


const getLikedSongs = async () : Promise<Song[]> => {

    
const supabase = createServerComponentClient({
    cookies: cookies
})

    const {
        data: {
            session
        }
    } = await supabase.auth.getSession() // короче нельзя юзать тут useUser

    

    


    const {data, error} = await supabase.from('likde_songs').select('*, songs(*)').eq('user_id', session?.user.id)

    // зафетчили дату с таблички songs

    if (error) {
        console.log(error)
        return []
    }

    if (!data) {
        return []
    }

    console.log(data)

    return data.map(song => ({
        ...song.songs
    }))
}

export default getLikedSongs;