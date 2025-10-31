import React from 'react'
import Field from './Field'
import Roster from './Roster'
import Field2 from './Field_2'

const Lineups = ({ game }) => {

  


  return (
    <div class={"md:px-0 px-1 flex flex-col gap-2 w-full overflow-x-auto md:overflow-visible"}>
      {
        game.players.lineups?.support_visual_lineups &&
        <Field2

          teams={game.players.lineups?.teams}
          colors={game.teams.map(team => team.colors)}
          ids={game.teams.map(team => team.id)}
        />
      }
      {
        
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