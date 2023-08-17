'use client'
import useAuthModal from "@/hooks/useAuthModal"
import React, {useEffect} from 'react'

import Modal from "./Modal"
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"

import { Auth } from "@supabase/auth-ui-react" // пре билд компонент для авторизации
import {ThemeSupa} from '@supabase/auth-ui-shared'

const AuthModal = () => {

    const supabaseClient = useSupabaseClient()
    const {session} = useSessionContext()

    const router = useRouter() // именно с навигации

    const {isOpen, onClose} = useAuthModal() // забираем стейты из хранилища (суперпросто)

    // надо создать onChange

    const onChange = (open : boolean) => {
        if (!open) {
            onClose()
        }
    }

    useEffect(() => {
        if (session) {
            router.refresh()
            onClose()
        }
    }, [session])
    

    // const {isOpen, onOpen, onClose} = useAuthModal()

    return (
        <Modal isOpen={isOpen} title="Welcome Back!" description="Login to your account" onChange={onChange} >
            <Auth magicLink supabaseClient={supabaseClient} appearance={{theme: ThemeSupa, variables: {
        default: {
          colors: {
            brand: '#178941',
            brandAccent: '#22c55e',
          },
        },
      },}} theme="dark" providers={['google', 'github', 'azure', 'apple']} /> {/* даем клиента + хотим застайлить => appearence={{theme:...}} */}
        </Modal>
    )
}


export default AuthModal;