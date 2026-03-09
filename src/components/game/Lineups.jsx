import React from 'react'
import { useEffect, useState } from "preact/hooks";
import Roster from '@/components/game/Roster';
import Field2 from '@/components/game/Field_2';
import FieldContainer from '@/components/game/lineups/FieldContainer';
import Rosters from '@/components/game/lineups/Rosters';
import { useGame } from '@/hooks/useGame';
import PosessionBar from '@/components/game/lineups/PosessionBar';

const Lineups = ({ id }) => {

  const { data } = useGame(id)
  const game = data.game
  const lineups = game.players.lineups
  const posession = "statistics" in game && game.statistics.find(stat => stat.name === "Posesión")


  return (
    <div class={"w-full pb-40 md:px-0 px-1 flex flex-col gap-2 overflow-x-auto md:overflow-visible"}>

      {lineups.support_visual_lineups && <FieldContainer id={id} />}
      <PosessionBar posession={posession} colors={game.teams.map(x=>x.colors)} />
      <Rosters id={id} />

    </div>
  )
}

export default Lineups