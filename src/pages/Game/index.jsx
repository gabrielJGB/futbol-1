// @ts-nocheck
import { useEffect, useState } from "preact/hooks";
import Menu from "../../components/Menu";
import Tabs from "./components/Tabs";
import { showMenu } from "../../signals/signals";
import { useGame } from "./useGame";
import GameHeader from "./components/GameHeader";
import Videos from "./components/Videos";
// import data from '../../../GAME_IN.json' //PRE  IN   END
import Loading from "../../components/Loading";

export function Game({ id }) {

  const { data, loading, error } = useGame(id)
  // const loading = false
  // const error = false

  if (loading)
    return (
      <div class={"w-full mt-5 md:col-start-2"}>
        <Loading />
      </div>)

  if (error)
    return (<div>Ha ocurrido un error</div>)


  return (
    <div class={" relative  md:mx-20  pb-40 md:p-5 pt-1 min-h-screen  md:w-auto w-full px-1 shadow-black shadow-lg  bg-background border-[1px] border-borderc  md:col-start-2"}>

      <Videos videos={data.game.videos} />
      <GameHeader game={data.game} />
      <Tabs game={data.game} />


    </div>
  )
}

