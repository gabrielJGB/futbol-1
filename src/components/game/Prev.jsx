import React from 'react'
import { LastGames, HeadToHead, Odds, Positions } from '@/components/game/prev'
import { useGame } from '@/hooks/useGame'
import MissingPlayers from '@/components/game/prev/MissingPlayers'
import Fade from '@mui/material/Fade'

const Prev = ({ id }) => {

  const { data } = useGame(id)
  const { game } = data




  return (
    <Fade in={true} timeout={300} >
      <div class={"grid md:grid-cols-2 grid-cols-1 gap-4 mb-40 md:px-0 px-1 md:mt-4 mt-2"}>

        <div class={"md:order-1 order-2 flex flex-col md:gap-4 gap-4"}>
          {"head_to_head" in game && <HeadToHead game={game} />}
          {"standings" in game && <Positions game={game} />}
          {"prediction" in game && <Odds game={game} />}
        </div>

        <div class={"md:order-2 order-1 w-full flex flex-col md:gap-4 gap-4 mt-4 md:mt-0"}>
          {"players" in game && <MissingPlayers game={game} />}
          {"recent_form" in game && <LastGames game={game} />}
        </div>
      </div>
    </Fade>
  )
}

export default Prev