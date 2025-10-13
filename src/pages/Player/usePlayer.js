import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';


export const usePlayer = (name) => {

    // 2️⃣ Segundo fetch, solo si el primero tuvo éxito y cumple condición
    // const shouldFetchPosts = user && user.id > 0; // o cualquier condición tuya
    const url = `https://site.web.api.espn.com/apis/search/v2?region=ar&lang=es&limit=10&page=1&dtciVideoSearch=true&query=${name}`

    const res = useSWR(url,
        fetcher,
        {

            revalidateIfStale: true,
            revalidateOnFocus: false,
        }
    );

    
    

    if(res.data.totalFound>0 && res.data.results[0].totalFound>0 && res.data.results[0].contents[0].displayName === name)
        console.log("FOUND");

    else
        console.log("NOT FOUND");


    return {
        data:res.data
    }


    // const { data: posts, error: postsError } = useSWR(
    //     shouldFetchPosts ? `/api/posts?userId=${user.id}` : null,
    //     fetcher
    // );


    // const url = `https://corsproxy.io/?https://api.promiedos.com.ar/gamecenter/${id}`

    // const res = useSWR(url,
    //     fetcher,
    //     {

    //         revalidateIfStale: true,
    //         revalidateOnFocus: false,
    //         refreshInterval: 30000
    //     }
    // );




    // return {
    //     data:res.data,
    //     loading: res.isLoading,
    //     error: res.error
    // };



}
