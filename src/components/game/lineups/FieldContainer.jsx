import FieldLinesDrawing from '@/components/game/lineups/FieldLinesDrawing'
import FormationStrings from '@/components/game/lineups/FormationStrings'
import Options from '@/components/game/lineups/Options'
import TeamField from '@/components/game/lineups/TeamField'
import { useGame } from '@/hooks/useGame'
import { useRouter } from 'preact-router'
import React from 'react'

const FieldContainer = ({ id }) => {

  const { data } = useGame(id)
  const teams = data.game.players.lineups.teams
  const colors = [data.game.teams[0].colors, data.game.teams[1].colors]
  const formations = [teams[0].formation, teams[1].formation]
  const ids = [data.game.teams[0].id, data.game.teams[1].id]
  const assists = data.game.events.flatMap(x=>x.rows).filter(e=>e.events[0].type === 1 && e.events[0].texts.length >1).map(e=>e.events[0].texts[1])


  return (
    <div class={"flex flex-col gap-1"}>

      <div class={"flex flex-row gap-1 items-center"}>
        
      </div>

      <Options/>

      <div class={"z-0 grid grid-cols-2  bg-[url('/fieldbg.png')] bg-repeat shadow-gray-950 md:h-[450px] h-[430px] relative rounded-lg  md:w-full w-[200vw] "}>

        <FieldLinesDrawing />
        <FormationStrings
          formations={formations}
          ids={ids}
        />

        {
          teams.map((team, i) => (
            <TeamField isHome={i == 0} team={{ ...team, colors: colors[i] }} gameId={id} teamId={ids[i]} assists={assists}/>
          ))
        }


      </div>
    </div>
  )
}

export default FieldContainer