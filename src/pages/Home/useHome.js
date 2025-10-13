import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';




export const useHome = (date) => {

    const data = useSWR(
        date ? `https://corsproxy.io/?https://api.promiedos.com.ar/games/${date}`
            : null,
        fetcher,
        {

            revalidateIfStale: true,
            revalidateOnFocus: false,
            refreshInterval: 30000
        }
    );
    



    return {
        data: data.data,
        loading: data.isLoading,
        error: data.error
    };
    


}
