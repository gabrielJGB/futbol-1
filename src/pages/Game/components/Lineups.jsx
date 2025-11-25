import React from 'react'
import { useEffect, useState } from "preact/hooks";
import Field from './Field'
import Roster from './Roster'
import Field2 from './Field_2'

const Lineups = ({ game }) => {

  const [invertLines, setInvertLines] = useState(false)
  const lineups = game.players.lineups?.teams

  return (
    <div class={"md:px-0 px-1 flex flex-col gap-2 w-full overflow-x-auto md:overflow-visible"}>
      {
        game.players.lineups?.support_visual_lineups &&
        <Field2
          invertLines={invertLines}
          setInvertLines={setInvertLines}
          teams={lineups}
          colors={game.teams.map(team => team.colors)}
          ids={game.teams.map(team => team.id)}
        />
      }
      {

        <Roster
          missingPlayers={"missing_players" in game.players ? game.players.missing_players : false}
          roster={lineups}
          teams={game.teams}
          invertLines={invertLines}
        />
      }

    </div>
  )
}

export default Lineups