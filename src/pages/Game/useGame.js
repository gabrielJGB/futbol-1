import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';




export const useGame = (id) => {

    const url = `https://corsproxy.io/?https://api.promiedos.com.ar/gamecenter/${id}`

    const res = useSWR(url,
        fetcher,
        {

            revalidateIfStale: true,
            revalidateOnFocus: false,
            refreshInterval: 30000
        }
    );


    

    return {
        data:res.data,
        loading: res.isLoading,
        error: res.error
    };



}
