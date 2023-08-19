import getLikedSongs from '@/actions/getLikedSongs';
import Box from '@/components/Box';
import Header from '@/components/Header';
import LibraryItem from '@/components/LibraryItem';
import LikedContent from '@/components/LikedContent';
import Image from 'next/image';

export const revalidate = 0;

const page = async () => {

    const songs = await getLikedSongs()


  return (
    <Box className='h-full overflow-hidden overflow-y-auto'>
        <Header className='pb-[3rem]'>
          <div className='mt-20'>
            <div className='flex flex-col md:flex-row items-center gap-5'>
              <div className='relative h-32 w-32 lg:w-44 lg:h-44 /image-container/'>
                <Image src={'/images/liked.png'} alt='liked' fill className='object-cover' />
              </div>
              <div className='flex flex-col gap-2 mt-4 md:mt-0'>
                <span className='hidden md:block font-semibold text-sm '>Playlist</span>
                <span className='text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold'>Liked Songs</span>
              </div>
            </div>
          </div>
        </Header>

        <LikedContent songs={songs} />
    </Box>
  )
}

export default page