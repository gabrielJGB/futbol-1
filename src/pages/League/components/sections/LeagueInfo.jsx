import React from 'react'

const LeagueInfo = ({ league }) => {

    const leagueName = league.league.name
    const leagueId = league.league.id
    const countryName = league.league



    return (
        <div class={"flex flex-col gap-2 "}>

            <div class="flex  flex-row items-center md:justfy-between justify-start gap-2 md:px-0 pb-1 px-1 border-b-2 border-[#C2E213] ">
                <img src={`https://api.promiedos.com.ar/images/league/${leagueId}/1`} alt="Logo" className="h-15" />
                <h2 class="text-right md:text-4xl text-3xl  font-bold ">{leagueName}</h2>
            </div>
        </div>
    )
}

export default LeagueInfo