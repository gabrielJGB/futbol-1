import Roster from '@/components/game/lineups/Roster'
import { useGame } from '@/hooks/useGame'
import React from 'react'

const Rosters = ({ id }) => {

    const { data } = useGame(id)
    const { game } = data

    

    const teams = [
        {
            ...game.players.lineups.teams[0],
            ...game.teams[0],
            missing:"missing_players" in game.players && game.players.missing_players[0],
            isHome:true,
        },
        {
            ...game.players.lineups.teams[1],
            ...game.teams[1],
            missing: "missing_players" in game.players &&  game.players.missing_players[1],
            isHome:false,
        }
    ]

    return (
        <div className="relative md:w-auto w-[200vw] grid grid-cols-2  md:gap-4 gap-4 overflow-hidden mb-20">

            {
                teams.map((team,i)=>(

                    <Roster key={team.id} team={team}  />
                ))
            }

        </div>

    )
}

export default Rosters

