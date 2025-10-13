import React from 'react'
import { useEffect, useState } from "preact/hooks";
import Menu from '../../components/Menu'
import LeagueView from './components/LeagueView';
import { showMenu } from '../../signals/signals';

const League = ({ id }) => {


useEffect(() => {
  showMenu.value = false
}, [id])



  return (
    <div class={"grid grid-cols-1 md:grid-cols-[250px_70%] gap-20 md:px-0 px-2"}>

      <div class={`z-100 md:bg-transparent bg-[rgba(0,0,0,0.9)]  md:static   md:-left-auto  fixed md:w-[250px] w-full   top-0 ${showMenu.value ? "-left-[0%]" : "-left-[100%]"} transition-all`}>
        <Menu />
      </div>

      
        <LeagueView leagueId={id} />
      
    </div>
  )
}

export default League