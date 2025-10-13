import React from 'react'
import LastGames from './prev/LastGames'
import HeadToHead from './prev/HeadToHead'
import Odds from './prev/Odds'
import Positions from './prev/Positions'

const Prev = ({ game }) => {

  

  return (
    <div class={"flex flex-col gap-6"}>

      {"recent_form" in game && <LastGames game={game} />}
      {"head_to_head" in game && <HeadToHead game={game} />}
      {"standings" in game && <Positions game={game} />}
      {"prediction" in game && <Odds game={game} />}

    </div>
  )
}

export default Prev