import { Song } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const supabase = createServerComponentClient({
    cookies: cookies
})

const getSongs = async () : Promise<Song[]> => {

    

    const {data, error} = await supabase.from('songs').select('*')

    // зафетчили дату с таблички songs

    if (error) {
        console.log(error)
    }

    return data as any || []
}

export default getSongs;