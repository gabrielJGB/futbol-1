import React from 'react'

const LeagueInfo = ({ league }) => {

    const leagueName = league.league.name
    const leagueId = league.league.id
    const countryName = league.league

// bg-gradient-to-r from-[#C2E213] to-[#C2E213]/70

    return (
        

            <div class="w-full border-b-[1px] bg-b2/20 border-borderc  text-white  flex flex-row items-center md:justfy-between text-shadow-xs text-shadow-white justify-start gap-2 p-4 ">
                <img src={`https://api.promiedos.com.ar/images/league/${leagueId}/1`} alt="Logo" className="h-15" />
                <h2 class="text-right md:text-4xl text-3xl  font-bold ">{leagueName}</h2>
            </div>
        
    )
}

export default LeagueInfo