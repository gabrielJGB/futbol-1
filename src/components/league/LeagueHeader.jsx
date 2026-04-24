import { useLeague } from '@/hooks/useLeague'
import React from 'react'

const LeagueHeader = ({ id }) => {

    const { games, league, gamesError, leagueError, gamesLoading, leagueLoading } = useLeague(id)

    const leagueName = league.league.name
    const countryName = league.league.country_name
    const countryId = league.league.country_id



    // bg-gradient-to-r from-[#C2E213] to-[#C2E213]/70

    return (


        <div class="w-full border-b-[1px] bg-b2 border-borderc    flex flex-row items-start md:justfy-between justify-start gap-2 px-4 py-3 ">

            <img src={`https://api.promiedos.com.ar/images/league/${id}/1`} alt="Logo" className="h-15 rounded" />

            <div class={"flex flex-col gap-1"}>

                <h2 class="text-3xl tracking-wide font-semibold text-white text-shadow-xs text-shadow-black">{leagueName}</h2>

                <div class={"flex flex-row items-center gap-1"}>
                    <img src={`https://api.promiedos.com.ar/images/country/${countryId}/1`} alt="Logo" className="h-4 rounded" />
                    <h3 class={"text-xs text-shadow-xs text-shadow-black text-white tracking-widest"}>{countryName}</h3>
                </div>
            </div>

        </div>

    )
}

export default LeagueHeader