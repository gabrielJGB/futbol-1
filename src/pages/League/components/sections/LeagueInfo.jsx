import React from 'react'

const LeagueInfo = ({ league }) => {

    const leagueName = league.league.name
    const leagueId = league.league.id
    const countryName = league.league



    return (
        

            <div class="border-[1px] border-[#C2E213] text-black bg-gradient-to-r from-[#C2E213] to-[#C2E213]/70 rounded-lg shadow-gray-800 shadow-lg flex flex-row items-center md:justfy-between justify-start gap-2 p-4 md:w-max">
                <img src={`https://api.promiedos.com.ar/images/league/${leagueId}/1`} alt="Logo" className="h-15" />
                <h2 class="text-right md:text-4xl text-3xl  font-bold ">{leagueName}</h2>
            </div>
        
    )
}

export default LeagueInfo