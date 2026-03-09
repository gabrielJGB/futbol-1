import React from 'react'
import { LastGames,HeadToHead,Odds,Positions } from '@/components/game/prev'
import { useGame } from '@/hooks/useGame'

const Prev = ({ id }) => {

   const { data } = useGame(id)
    const {game} = data

  return (
    <div class={"flex flex-col gap-6 mb-40 px-2"}>

      {"recent_form" in game && <LastGames game={game} />}
      {"head_to_head" in game && <HeadToHead game={game} />}
      {"standings" in game && <Positions game={game} />}
      {"prediction" in game && <Odds game={game} />}

    </div>
  )
}

export default Prev