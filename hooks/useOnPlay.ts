import { Song } from "@/types";
import usePlayer from "./usePlayer";
import { useUser } from "./useUser";
import useAuthModal from "./useAuthModal";


const useOnPlay = (songs : Song[]) => { // будем передавать в хук треки (т.е. плейлист треков, который будет играть)
    const player = usePlayer() // берем наш стор с функциями, которые будут заполнять ids / activeId

    const {user} = useUser() // если челик не зареган, то мы его отправим регаться (откром модалку)
    const {onOpen} = useAuthModal()

    const onPlay = (id: string) => {

        if (!user) {
            return onOpen() // если не ретерним, то включится модалка + заиграет тречок)))
        }

        player.setId(id)
        player.setIds(songs.map(song => song.id)) // пройдемся по песням из плэйлиста и вернем список их адишников

    }

    return onPlay;
    
}

export default useOnPlay;

// с этим хуком мы можем спокойно ходить и побираться.
// просто идем в разные места, где дают песни (например, на главной странице дают все песни)
// в хук будем кидать песни, которые приходят, а онплэй будем кидать в онклик, где мы эти треки мэпим
// + в онплэй кидаем айдишник песни, по которой проходимся