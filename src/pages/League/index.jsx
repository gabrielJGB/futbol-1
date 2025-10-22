import React from 'react'
import { useEffect, useState } from "preact/hooks";
import Menu from '../../components/Menu'
import LeagueView from './components/LeagueView';
import { showMenu } from '../../signals/signals';

const League = ({ id }) => {


  useEffect(() => {
      
      showMenu.value = window.innerWidth < 768? false:true

    
  }, [id])



  return (

    <LeagueView leagueId={id} />
  )
}

export default League