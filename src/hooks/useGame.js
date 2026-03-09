import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';

export const useGame = (id) => {

    const url = `https://api.promiedos.com.ar/gamecenter/${id}`

    const res = useSWR(url,
        fetcher,
        {

            revalidateIfStale: true,
            revalidateOnFocus: false,
            refreshWhenHidden: true,
            refreshInterval: 30000,
        }
    );




    return {
        data:res.data,
        loading: res.isLoading,
        error: res.error
    };
}



// import data from '@/data/dummy/GAME_END.json'
// export const useGame = (id) => {


//     return {
//         data:data,
//         isLoading: false,
//         error: false
//     }
// }