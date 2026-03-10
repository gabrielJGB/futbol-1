import React from 'react'
import { useEffect, useState } from "preact/hooks";
import Roster from '@/components/game/Roster';
import Field2 from '@/components/game/Field_2';
import FieldContainer from '@/components/game/lineups/FieldContainer';
import Rosters from '@/components/game/lineups/Rosters';
import { useGame } from '@/hooks/useGame';
import PosessionBar from '@/components/game/lineups/PosessionBar';
import Fade from '@mui/material/Fade';

const Lineups = ({ id }) => {

  const { data } = useGame(id)
  const game = data.game
  const lineups = "lineups" in game.players && game.players.lineups
  const posession = "statistics" in game && game.statistics.find(stat => stat.name === "Posesión")


  return (
    <Fade in={true} timeout={300} >
      <div class={"w-full pb-40 md:px-0 px-1 flex flex-col gap-2 overflow-x-auto md:overflow-visible"}>

        {lineups.support_visual_lineups &&
          <FieldContainer id={id} />

        }

        {
          posession &&
          <PosessionBar posession={posession} colors={game.teams.map(x => x.colors)} />
        }


        {lineups &&
          <Rosters id={id} />
        }


      </div>
    </Fade>
  )
}

export default Lineups