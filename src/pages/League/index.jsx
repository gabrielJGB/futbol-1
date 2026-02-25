import React from 'react'
import { useEffect } from "preact/hooks";
import { showMenu } from '@/signals/home';
import { LeagueView } from '@/components/league';


const League = ({ id }) => {


  useEffect(() => {
      
      showMenu.value = window.innerWidth < 768? false:true

    
  }, [id])



  return (

    <LeagueView leagueId={id} />
  )
}

export default League