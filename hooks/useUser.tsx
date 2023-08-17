import { Subscription, UserDetails } from '@/types';
import { User } from '@supabase/auth-helpers-nextjs'
import React, {createContext, useEffect, useState, useContext} from 'react'
import {useSessionContext, useUser as useSupaUser} from '@supabase/auth-helpers-react'
type UserContextType = {
    accessToken : string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export interface Props {
    [propName : string] : any;
}

export const MyUserContextProvider = (props : Props) => {
    const {
        session,
        isLoading : isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext()

    

    const user = useSupaUser()
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false)
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
    const [subscription, setSubscription] = useState<Subscription | null>(null)

    const getUserDetails = () => supabase.from('users').select('*').single()
    const getSubscription = () => supabase.from('subscriptions').select('*, prices(*, products(*))').in('status', ['trialing', 'active']).single()

    useEffect(() => {
        if (user && !isLoadingData && !userDetails && !subscription) {
            Promise.allSettled([getUserDetails(), getSubscription()])
                .then(res => {
                    const userDetailsPromise = res[0] //fulfielled / rejected
                    const SubscriptionPromise = res[1] //fulfielled / rejected

                    if (userDetailsPromise.status === 'fulfilled') { // если статус fulfielled, то в юзердетэйлс засовываем то, что получили с дб
                        setUserDetails(userDetailsPromise.value.data as UserDetails)
                    }
                    if(SubscriptionPromise.status === 'fulfilled') {
                        setSubscription(SubscriptionPromise.value.data as Subscription) // то же самое делаем с подпиской
                    }

                    setIsLoadingData(false) // и сказали, что загрузки больше нет
                })
        } else if (!user && !isLoadingData && !isLoadingUser) { // нет юзера + ничо не грузится
            setUserDetails(null)
            setSubscription(null)
        }
    }, [isLoadingUser, user])




    const value = {
        user,
        userDetails,
        accessToken,
        isLoading: isLoadingUser || isLoadingData, // загрузка будет либо, если загружается юзер, либо если загружается дата
        subscription,

    }

    return (
        <UserContext.Provider value={value} {...props} />
    )
} 

export const useUser = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('CONTEXT IS USED OUTSIDE OF PROVIDER')
    }
    return context
}