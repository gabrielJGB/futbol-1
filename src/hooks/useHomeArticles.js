import { fetcher, playerFetcher } from "@/utils/fetcher";
import useSWR from "swr";

export const useHomeArticles = (date) => {


    const articles = useSWR(
         `https://site.web.api.espn.com/apis/site/v2/sports/soccer/all/news?lang=es&region=ar&limit=30&_${date}`,
        playerFetcher,
        {

            revalidateIfStale: true,
            revalidateOnFocus: false,
            refreshInterval: 60000
        }
    );

    



    return {
        data:articles.data,
        loading:articles.isLoading,
        error: articles.error
    };
}