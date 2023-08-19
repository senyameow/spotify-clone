// здесь будем искать песни (но можно не только по названию, поэтому сразу делаем так, чтобы можно было добавлять еще фильтры)

import getSongsByTitle from "@/actions/getSongsByTitle";
import Box from "@/components/Box";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";

interface SearchProps {
    searchParams: { // у нас есть параметры поиска
        title: string; // например название трека
    }
}

export const revalidate = 0;

const Search = async ({searchParams} : SearchProps) => {
    const songs = await getSongsByTitle(searchParams.title)

    return (
        <div>
            <Box className="h-[100vh]">
                <Header className="from-neutral-600 pb-10 rounded-xl">
                    <div className="mb-2 flex flex-col gap-y-6 w-full">
                        <h1 className="text-white text-3xl font-semibold">Search</h1>
                        <SearchInput />
                    </div>
                </Header>
                <SearchContent songs={songs} />
            </Box>
        </div>
    )
}

export default Search;