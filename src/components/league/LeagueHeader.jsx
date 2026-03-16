import { useLeague } from '@/hooks/useLeague'
import React from 'react'

const LeagueHeader = ({ id }) => {

    const { games, league, gamesError, leagueError, gamesLoading, leagueLoading } = useLeague(id)

    const leagueName = league.league.name
    const countryName = league.league

// bg-gradient-to-r from-[#C2E213] to-[#C2E213]/70

    return (
        

            <div class="w-full border-b-[1px] bg-b2 border-borderc  text-white  flex flex-row items-center md:justfy-between text-shadow-xs text-shadow-white justify-start gap-2 px-4 py-2 ">

                <img src={`https://api.promiedos.com.ar/images/league/${id}/1`} alt="Logo" className="h-15 rounded" />
                <h2 class="md:text-4xl text-3xl tracking-wide font-semibold text-shadow-xs text-shadow-black">{leagueName}</h2>
                
            </div>
        
    )
}

export default LeagueHeader