'use client'
import React, {useState} from 'react'
import { Database } from "@/types_db"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

interface SupabaseProviderProps {
    children: React.ReactNode
}


const SupabaseProvider = ({children} : SupabaseProviderProps) => {

    const [supabaseClient] = useState(() => {
        return createClientComponentClient<Database>() // it is how we should do that

    })

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
        {children}
    </SessionContextProvider>
  )
}

export default SupabaseProvider