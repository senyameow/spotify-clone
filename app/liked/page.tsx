import getLikedSongs from '@/actions/getLikedSongs';

export const revalidate = 0;

const page = async () => {

    const songs = await getLikedSongs()

  return (
    <div>
        Liked songs
    </div>
  )
}

export default page