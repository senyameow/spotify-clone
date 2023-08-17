import {create} from 'zustand'

interface AuthModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

}

const useAuthModal = create<AuthModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}), // теперь можем подобрать эту функцию в хедере и передать ее кнопкам
    onClose: () => set({isOpen: false}),

}));

export default useAuthModal;

// вся эта шняга нужна чтобы сделать стор (т.е. у нас небольшой стор, с помощью которого мы избавляемся от пропс дриллинга)
// zustand просто альтернатива редакса и все.
// просто засторили несколько функций и стейт, все юзаем теперь там, где нам надо (+ нужно сделать интерфейс, чтобы тс не ругался)

// вытащить данные тоже просто:
// const isOpen = useAuthModal(state => state.isOpen), так можно достать isOpen