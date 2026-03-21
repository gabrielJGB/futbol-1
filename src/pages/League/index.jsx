// @ts-nocheck
import React from 'react'
import { useEffect, useState } from "preact/hooks";
import { showMenu } from '@/signals/home';
import { useLeague } from '@/hooks/useLeague';
import LeagueHeader from '@/components/league/LeagueHeader';
import BottomTabs from '@/components/league/BottomTabs';
import SelectedTab from '@/components/league/SelectedTab';
import Brackets from '@/components/league/tabs/Brackets';
import Tables from '@/components/league/tabs/Tables';
import PlayerStats from '@/components/league/tabs/PlayerStats';
import Fixture from '@/components/league/tabs/Fixture';
import TeamsStats from '@/components/league/tabs/TeamsStats';
import History from '@/components/league/tabs/History';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { selectedTab } from '@/signals/league';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { MdExpandMore } from 'react-icons/md';
import AccordionDetails from '@mui/material/AccordionDetails';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Stats from '@/components/league/tabs/Stats';
import { Loading } from '@/components/common';


const League = ({ id }) => {


  const { games, league, teamStats, leagueHistory, gamesError, leagueError, gamesLoading, leagueLoading } = useLeague(id)

  useEffect(() => {
    document.title =  league.league.name + " - Fútbol 1"
    selectedTab.value = window.innerWidth < 768 ? "fixture" : "principal"
  }, [])

      


  if (gamesLoading || leagueLoading)
    return (
      <div class={" md:col-start-2 flex flex-col w-full mx-auto"}>
        <Loading />
      </div>
    )
  //"relative  md:mx-12 md:rounded-t md:p-0   md:mt-2  overflow-x-auto px-0 shadow-black md:shadow-lg bg-background/70 border-x-[1px] border-borderc  md:col-start-2 flex flex-col"

  return (
    <div class="relative min-h-screen md:mx-12 md:rounded-t md:p-0   md:mt-2  overflow-x-auto px-0 shadow-black md:shadow-lg bg-background/70 border-x-[1px] border-borderc  md:col-start-2 flex flex-col">

      <LeagueHeader id={id} />


      <div class={"md:order-2 mx-1 mb-20"}>


        <div class={`${selectedTab.value === "principal" ? "" : "hidden"}  grid ${league.tables_groups != undefined ? "grid-cols-2 mx-4" : "grid-cols-1 mx-50"} gap-10 md:mt-7  mb-20`}>

          <Tables id={id} show={league.tables_groups != undefined} />
          <Fixture id={id} show={league.games != undefined} />

        </div>

        <div class={`${selectedTab.value === "fixture" ? "" : "hidden"} mt-2`}>
          <Fixture id={id} show={league.games != undefined} />
        </div>

        <div class={`${selectedTab.value === "tablas" ? "" : "hidden"} `}>
          <Tables id={id} show={league.tables_groups != undefined} />
        </div>

        <div class={`${selectedTab.value === "llaves" ? "" : "hidden"} overflow-x-auto mt-3`}>
          <Brackets id={id} show={league.brackets != undefined} />
        </div>

        <div class={`${selectedTab.value === "estadisticas" ? "" : "hidden"} overflow-x-auto mt-3`}>
          <Stats id={id} />
        </div>

      </div>


      <BottomTabs id={id} />

    </div>
  )
}

export default League