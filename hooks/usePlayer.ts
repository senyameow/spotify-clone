// делаем стор треков, которые будут играть
// например, если мы нажимаем на трек из нашей библиотеки, он будут играть треки только из библиотеки
// если ищем песню и нажимаем на нее, то играть будет ТОЛЬКО она

// как нам это все засторить?

// будут айдишники треков, которые будут проигрываться
// будет айдишник трека, который проигрывается в данный момент (на который нажали)
// также нам нужны функции, которые устанавливают айдишники треков
// ресет функция, которая позволит отчищать айдишники треков

// для хранилища используем zustand, впадлу редакс + уже юзали цустанд

import { create } from "zustand";

interface PlayerStore {
    ids: string[];
    activeId: string;
    setId: (id: string) => void;
    setIds: (ids: string[]) => void;
    reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
    ids: [],
    activeId: '',
    setId: (id: string) => set({activeId: id}),
    setIds: (ids: string[]) => set({ids: ids}),
    reset: () => set({ids: [], activeId: ''})
}))

export default usePlayer;