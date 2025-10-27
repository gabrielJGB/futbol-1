import useSWR from 'swr';
import { fetcher } from '../../lib/fetcher';


export const useArticle = (id) => {

    const query = useSWR(
        id ? `https://now.core.api.espn.com/v1/sports/news/${id}?lang=es`
    : null,
        fetcher,
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
