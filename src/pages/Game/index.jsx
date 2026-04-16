// @ts-nocheck
import { useEffect, useState } from "preact/hooks";
import { showMenu } from "@/signals/home";
import { useGame } from "@/hooks/useGame";
import data from '@/data/dummy/GAME_PEN.json'
import {
  Tabs,
  GameHeader,
  Videos,
  Lineups,
  Events,
  Prev,
  Stats
} from "@/components/game";

import {
  Loading,
  Menu
} from "@/components/common";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomTabs from "@/components/game/BottomTabs";
import TabsContainer from "@/components/game/TabsContainer";


export function Game({ id }) {

  const { data, loading, error } = useGame(id)

  if (loading)
    return (
      <div class={"w-full mt-5 md:col-start-2"}>
        <Loading />
      </div>)

  if (error)
    return (<div class={"text-center text-red-600 font-semibold w-full mt-7"}>Ha ocurrido un error {":("}</div>)


  


  return (
    <div class={" relative max-lg:landscape:mx-1 md:mx-20 md:rounded-t md:p-0  min-h-screen md:mt-2 md:w-auto w-full px-0 shadow-black shadow-lg  bg-background/70 border-x-[1px] border-borderc  md:col-start-2"}>

      
      <Videos id={id} />
      <GameHeader id={id} />
      <TabsContainer id={id} />

    </div>
  )
}




