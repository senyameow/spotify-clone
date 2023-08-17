import {create} from 'zustand'

interface UploadModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

}

const useUploadModal = create<UploadModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}), // теперь можем подобрать эту функцию в хедере и передать ее кнопкам
    onClose: () => set({isOpen: false}),

}));

export default useUploadModal;

// МЫ ПРОСТО СКОПИРОВАЛИ СЕЙЧАС ТОТ ХУК И СКАЗАЛИ, ЧТО ТЕПЕРЬ ЭТО ДРУГОЙ СТОР
//ТЕПЕРЬ У НАС ВСЕ ТО ЖЕ САМОЕ, НО ДЛЯ ДРУГОГО ОКНА (ТАК ЖЕ МОЖЕМ ЕГО ОТКРЫВАТЬ И ЗАКРЫВАТЬ) МЕЕГА  КРУТО