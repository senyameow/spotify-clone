
import '../globals.css'
import Header from '@/components/Header'
import ListItem from '@/components/ListItem'
import getSongs from '@/actions/getSongs'
import PageContent from '../components/PageContent';

export const revalidate = 0;


export default async function Home() {

  const songs = await getSongs()

  return (
   <div className='bg-neutral-900 h-full w-full overflow-hidden overflow-y-auto rounded-lg'>
      <Header>
        <div className='mb-2'>
            <h1 className='text-3xl text-white font-semibold'>
              Welcome Back!
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 mt-4'>
              <ListItem name={'Liked Song'} href='/liked' />
            </div>
        </div>
        
      </Header>
      <div className='px-6 mb-7 mt-3'>
        <h1 className='text-2xl text-white'>Newest Songs</h1>
      <PageContent songs={songs} />
      </div>

     
   </div>
  )
}
