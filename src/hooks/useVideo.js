import { playerFetcher } from '@/utils/fetcher';
import useSWR from 'swr';



export const useVideo = (id) => {

    const query = useSWR(
        id ? `https://api-app.espn.com/v1/video/clips/${id}?lang=es`
    : null,
        playerFetcher,
        {
            revalidateOnFocus: false,
            refreshInterval: 60000
        }
    );




    return {
        data: query.data,
        loading: query.isLoading,
        error: query.error 
    };
}