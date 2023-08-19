import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadSong = (song: Song) => {

    const supabaseClient = useSupabaseClient() // берем клиент, чтобы зафетчить дату

    if (!song) {
        return
    } // если ничего не передали, то мы не можем зафетчить, ретерним (нулл)

    const {data: songData} = supabaseClient.storage.from('songs').getPublicUrl(song.song_path)

    // через клиент обращаемся к дб к бакету songs, и через getPublicUrl забираем ссылку на трек (ну в объекте ссылка лежит)


    return songData.publicUrl as string
}

export default useLoadSong;