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
    <div class={"z-10 relative grid md:grid-cols-[1fr_3fr] grid-cols-1 md:px-0  md:gap-20 "}>

      <div class={`z-20 bg-[rgba(0,0,0,0.9)] md:h-max md:static   md:-left-auto  fixed  w-full   top-0 ${showMenu.value ? "-left-[0%]" : "-left-[100%]"} transition-all`}>
        <Menu />
      </div>

      <div class={"relative  w-full mb-20"}>
        <Videos videos={data.game.videos} />
        <GameHeader game={data.game} />
        <Tabs game={data.game} />
      </div>

    </div>
  )
}

