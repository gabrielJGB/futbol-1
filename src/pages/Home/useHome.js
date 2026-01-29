import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';



export const useHome = (date) => {

    const proxy = "https://corsproxy.io/?"
    const refresh = date === "hoy"

    if (date === "hoy")
        date = "today"

// date ? `${date != "today" ? proxy : ""}https://api.promiedos.com.ar/games/${date}`
    const data = useSWR(
        date ? `https://api.promiedos.com.ar/games/${date}`
            : null,
        fetcher,
        {

            revalidateIfStale: true,
            revalidateOnFocus: false,
            refreshInterval: refresh ? 20000 : null
        }
    );



    return {
        data: data.data,
        loading: data.isLoading,
        error: data.error
    };



}
