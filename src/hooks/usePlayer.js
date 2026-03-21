// @ts-nocheck
import useSWR from 'swr';
import { playerFetcher } from '@/utils/fetcher';
import { useMemo, useState } from 'preact/hooks';


export const usePlayer = (name) => {


    const baseURL = "https://webws.365scores.com/web/"

    const { data: searchData, isLoading: searchLoading, error: searchError } = useSWR(
        name ? `${baseURL}search/?appTypeId=5&langId=14&timezoneName=America/Buenos_Aires&userCountryId=382&query=${name}&filter=all&sports=1` : null,
        playerFetcher,
        {
            revalidateIfStale: true,
            revalidateOnFocus: false,

        },
    )

    const playerExists = useMemo(() => {
        return searchData &&
            searchData.athletes &&
            searchData.athletes.length > 0

    }, [searchData, name]);


    const { data: player, error: playerError, isLoading: playerLoading } = useSWR(
        playerExists ? `${baseURL}athletes/?appTypeId=5&langId=14&timezoneName=America/Buenos_Aires&userCountryId=382&athletes=${searchData.athletes[0].id}&fullDetails=true&topBookmaker=14` : null,
        playerFetcher,
        {
            revalidateIfStale: true,
            revalidateOnFocus: false,
        },
    )


    const isLoading = name && !searchData && !searchError;
    const isSearching = playerExists && !player && !playerError;
    const notFound = searchData && !playerExists;

    return {
        player: playerExists && player ? { ...searchData.athletes[0], ...player.athletes[0] } : null,
        isLoading: isLoading || isSearching,
        notFound,
        error: searchError || playerError
    }

}


export const usePlayerStats = (id, season) => {


    const baseURL = "https://webws.365scores.com/web/"

    const { data, isLoading, error } = useSWR(
        id ? `${baseURL}athletes/career?appTypeId=5&langId=14&timezoneName=America/Buenos_Aires&userCountryId=382&athleteId=${id}&seasonKey=${season}` : null,
        playerFetcher,
        {
            revalidateIfStale: true,
            revalidateOnFocus: false,

        },
    )

    return {
        data,
        isLoading,
        error
    }

}







// export const usePlayer = (name) => {

//     const [player, setPlayer] = useState(-1)
//     const baseURL = "https://webws.365scores.com/web/"

//     const { isLoading: searchLoading, error: searchError } = useSWR(
//         name ? `${baseURL}search/?appTypeId=5&langId=14&timezoneName=America/Buenos_Aires&userCountryId=382&query=${name}&filter=all&sports=1` : null,
//         playerFetcher,
//         {
//             revalidateIfStale: true,
//             revalidateOnFocus: false,
//             onSuccess: (data) => {
//                 if (data && data.athletes != undefined && data.athletes.length > 0)
//                     setPlayer({ id: data.athletes[0].id, clubName: data.athletes[0].clubName })
//             }
//         },
//     )



//     const { error: playerError, isLoading: playerLoading } = useSWR(
//         player != -1 ? `${baseURL}athletes/?appTypeId=5&langId=14&timezoneName=America/Buenos_Aires&userCountryId=382&athletes=${player?.id}&fullDetails=true&topBookmaker=14` : null,
//         playerFetcher,
//         {
//             revalidateIfStale: true,
//             revalidateOnFocus: false,
//             onSuccess: (data) => {
//                 setPlayer(prev => ({ ...prev, ...data.athletes[0] }))
//             }
//         },
//     )

//     if(player === -1)
//         return {}

//     return {
//         player,
//         playerLoading,
//         searchError,
//         playerError
//     }

// }
