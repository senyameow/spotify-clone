'use client'

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { SupabaseClient, useSession, useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import React, {useEffect, useState} from 'react'
import { toast } from 'react-hot-toast';
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'

interface LikeButtonProps {
    songId: string;
    onClick: () => void
}

const LikeButton = ({songId, onClick} : LikeButtonProps) => {

    const router = useRouter() // полезная штука энивей

    const {user} = useUser() // из юзера можем получить айдишник чела, чтобы, то, что он лайкнул было только его

    const {supabaseClient} = useSessionContext() // не очень понятно, что мы хотим от сессии конкретно пока что

    const authModal = useAuthModal() // если не зареганы обратимся к окну и откроем его через authModal.onOpen()

    const [isLiked, setIsLiked] = useState(false) // каждая кнопка может быть лайкнута или не лайкнута (горит не горит)


    useEffect(() => {
        if (!user?.id) {
            return setIsLiked(false)
        }

        const fetchData = async () => {
            const {data, error} = await supabaseClient.from('likde_songs').select('*').eq('user_id', user.id).eq('song_id', songId).single()

            if (error) {
                setIsLiked(false)
                console.log(error)
            }
            
            if (!error && data) {
                console.log(data)
                console.log('ТРУ')
                setIsLiked(true)
            }

            

            

            return data
        }

        fetchData()

    }, [songId, supabaseClient, user?.id])

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart

    const handleLike = async (id : string) => {
        
        if (!user) {
            return authModal.onOpen()
        }

        setIsLiked(!isLiked)
        console.log(user?.id)
        console.log(id)
        // надо сказать, что для этого юзера эта песня лайкнутая

        if (isLiked) {
            const {error: deleteError} = await supabaseClient.from('likde_songs').delete().eq('user_id', user.id).eq('song_id', songId)

            if (deleteError) {
                console.log(deleteError)
            } else {
                setIsLiked(false)
            }
        } else {

            const {error: likeError} = await supabaseClient.from('likde_songs').insert([{user_id: user?.id, song_id: id}]).select()

            if (likeError) {
                console.log(likeError)
            } else {
                setIsLiked(true)
            }
        }

        
    router.refresh()

        
    }


  return (
    <button onClick={() => handleLike(songId)} className='hover:opacity-[.85] transition '>
        <Icon size={32} className={`${isLiked ? 'text-#22c55e' : 'text-white'}`} />
    </button>
  )
}

export default LikeButton