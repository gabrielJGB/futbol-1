// @ts-nocheck
import { useEffect, useState } from "preact/hooks";
import { showMenu } from "@/signals/home";
import { useGame } from "@/hooks/useGame";
import data from '@/data/dummy/GAME_PEN.json'
import {
  Tabs,
  GameHeader,
  Videos
} from "@/components/game";

import {
  Loading,
  Menu
} from "@/components/common";



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
    return (<div class={"text-center w-full mt-7"}>Ha ocurrido un error {":("}</div>)


  return (
    <div class={" relative  md:mx-20  pb-40 md:p-5 md:pt-1 min-h-screen  md:w-auto w-full px-0 shadow-black shadow-lg  bg-background/70 border-x-[1px] border-borderc  md:col-start-2"}>

      <Videos videos={data.game.videos} />
      <GameHeader game={data.game} />
      <Tabs game={data.game} />


    </div>
  )
}

