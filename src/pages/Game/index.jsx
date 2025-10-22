// @ts-nocheck
import { useEffect, useState } from "preact/hooks";
import Menu from "../../components/Menu";
import Tabs from "./components/Tabs";
import { showMenu } from "../../signals/signals";
import { useGame } from "./useGame";
import GameHeader from "./components/GameHeader";
import Videos from "./components/Videos";
import data from '../../../GAME_IN.json' //PRE  IN   END

export function Game({ id }) {

  const { data, loading, error } = useGame(id)
  // const loading = false
  // const error = false

  if (loading)
    return (<div>Cargando...</div>)

  if (error)
    return (<div>Ha ocurrido un error</div>)


  return (
    <div class={"z-10 relative  md:px-20  pt-5 pb-20 col-start-2"}>

      <div class={"z-200 relative  mb-20 w-screen md:w-full"}>
        <Videos videos={data.game.videos} />
        <GameHeader game={data.game} />
        <Tabs game={data.game} />
      </div>

    </div>
  )
}

