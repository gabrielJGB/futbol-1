import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
const CORS_PROXY = "https://corsproxy.io/?"


/*  --test data-- */
import data from '@/data/dummy/TODAY.json'
export const useHome = (date) => {

    

    return {
        data,
        isLoading: false,
        error: false
    }
}




// export const useHome = (date) => {

//     const intervalEnabled = date === "hoy"
//     date = date === "hoy" ? "today" : date

//     const data = useSWR(
//         date ? `https://api.promiedos.com.ar/games/${date}` : null,
//         fetcher,
//         {
//             revalidateIfStale: true,
//             revalidateOnFocus: false,
//             refreshInterval: intervalEnabled ? 20000 : null
//         }
//     );

//     return {
//         data: data.data,
//         isLoading: data.isLoading,
//         error: data.error
//     };
// }
