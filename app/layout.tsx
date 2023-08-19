import Sidebar from '@/components/Sidebar'
import './globals.css'
import type { Metadata } from 'next'
import { Figtree, Inter } from 'next/font/google'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from '@/components/Player'



const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify',
  description: 'Spotify clone by senyameow',
}



// false | 'force-cache' | 0 | number 
// Ensure a layout or page is always dynamically rendered even if no dynamic functions or uncached data fetches are discovered



export default async function RootLayout({ 
  children,
}: {
  children: React.ReactNode
}) {

  const userSongs = await getSongsByUserId()


  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}> 
              {children}
            </Sidebar>
            <Player /> {/* хотим видеть плеер на всех наших страничка внизу, поэтому добавляем в лэйаут ниже страниц */}
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
