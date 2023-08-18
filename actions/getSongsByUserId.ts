import { Song } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"



const getSongsByUserId = async () : Promise<Song[]> => {

    const supabase = createServerComponentClient({
        cookies: cookies
    })

    

    const {data: sessionData, error: sessionError} = await supabase.auth.getSession() 
    
    // This method retrieves the current local session (i.e local storage).

    // возникает вопрос: нахрена мы взяли эту дату?
    // ответ: нам она нужна, чтобы получить юзер айди челика, потому что мы хотим создать функцию, которая позволит фетчить только те треки, 
    // которые этот юзер добавил (а не все треки из дб, что не логично)

    console.log(sessionData.session)

    if (sessionError) {
        console.log(sessionError)
        return []  // должны возвращать значение списка в любом случае
    }

    const {data, error} = await supabase.from('songs').select('*').eq('user_id', sessionData.session?.user.id).order('created_at', {ascending: false}) // берем всю дату из 
    // таблицы песен, которая удовлетворяет условию, что колонка user_id === юзер айди того чела, который сейчас в сессии
    // в дате кстати список, если навестись


    if (error) {
        console.log(error)
    }

    return (
        data as any || []
    )

    // по простецки возвращаем дату любого типа, ну или пустой список, если дата пустая (иначе будут траблы)

}

export default getSongsByUserId; 

// идем в лэйаут и кидаем туда функцию (делая лэйаут асинк)