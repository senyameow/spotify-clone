import { useUser } from "@/hooks/useUser"
import { Song } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"


const getLikedSongs = async () : Promise<Song[]> => {

    
const supabase = createServerComponentClient({
    cookies: cookies
})

    const {user} = useUser()

    

    const {data, error} = await supabase.from('likde_songs').select('*, songs(*)').eq('user_id', user?.id)

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