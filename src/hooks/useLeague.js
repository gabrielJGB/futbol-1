import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { selectedRound } from '@/signals/league';
import data from '@/data/dummy/LEAGUE_ARG1.json';
import dataGames from '@/data/dummy/FECHA_GAMES.json';


// export const useLeague = (id) => {
//     return {
//         league:data,
//         teamStats:[],
//         leagueHistory:[],
//         leagueLoading:false,
//         leagueError:false,
//     }

// }


// export const useLeagueGames = (id) => {
    
//     return {
//                 games:dataGames,
//                 gamesLoading:false,
//                 gamesError:false,
//     }

// }


export const useLeague = (id) => {



    const URLTablesFixture = `https://api.promiedos.com.ar/league/tables_and_fixtures/${id}`

    const { data: league, error: leagueError, isLoading: leagueLoading } = useSWR(
        URLTablesFixture,
        fetcher,
        {
            revalidateOnFocus: false,

        }
    );






    return {
        league,
        leagueError,
        leagueLoading,

    }



}

export const useLeagueGames = (id) => {
    const URLGames = `https://api.promiedos.com.ar/league/games/${id}/${selectedRound.value.key}`
    const { data: games, error: gamesError, isLoading: gamesLoading } = useSWR(
        URLGames,
        fetcher,
        {
            revalidateOnFocus: false,
        }
    );


    return {
        games,
        gamesLoading,
        gamesError,
    }
}

