import React from 'react'
import Field from './Field'
import Roster from './Roster'

const Lineups = ({ game }) => {

  


  return (
    <div class={"flex flex-col gap-2 w-full overflow-x-auto md:overflow-visible"}>
      {
        game.players.lineups?.support_visual_lineups &&
        <Field

          teams={game.players.lineups?.teams}
          colors={game.teams.map(team => team.colors)}
          ids={game.teams.map(team => team.id)}
        />
      }
      {
        "lineups" in game.players &&
        <Roster
          missingPlayers={"missing_players" in game.players ? game.players.missing_players : false}
          roster={game.players.lineups?.teams}
          teams={game.teams}
        />
      }

    </div>
  )
}

export default Lineups