import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';


export const useLeague = (id) => {

    const url_1 = `https://api.promiedos.com.ar/league/tables_and_fixtures/${id}`
    const url_2 = `https://api.promiedos.com.ar/league/tables_and_fixtures/${id}`
    const url_3 = `https://api.promiedos.com.ar/league/tables_and_fixtures/${id}`

    const res_1 = useSWR(url_1,
        fetcher,
        {
            revalidateIfStale: true,
            revalidateOnFocus: false,
        }
    );


    return {
        data:res_1.data
    }


  
}
