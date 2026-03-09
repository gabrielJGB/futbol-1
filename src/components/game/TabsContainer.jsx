import React from 'react'

import { useGame } from '@/hooks/useGame'
import { selectedTab } from '@/signals/game'
import {
    Lineups,
    Prev,
    Stats,
    
} from "@/components/game";
import BottomTabs from '@/components/game/BottomTabs';
import Events from '@/components/game/Events';
import { GiHamburger, GiSoccerField } from 'react-icons/gi';
import { BiHistory, BiStats } from 'react-icons/bi';
import { MdGraphicEq, MdMenu } from 'react-icons/md';
import { BarChart, BarChart2, BarChart4, BarChartIcon, LucideBarChart2 } from 'lucide-preact';

const TabsContainer = ({ id }) => {

    const i = selectedTab.value
    const { data } = useGame(id)
    const tabs = getTabsArray(data.game)
    const selected = tabs[i]


    return (
        <div class={"relative flex flex-col md:flex-col-reverse"}>
            <div class={"md:mx-3 md:h-auto"}>
                {selected.component(id)}
            </div>
            <div class={"md:relative sticky bottom-0"}>
                <BottomTabs tabs={tabs} />
            </div>
        </div>
    )
}

export default TabsContainer



const getTabsArray = (game) => {
    const tabs = []

    if (game.players != undefined) {
        tabs.push({
            name: "lineups",
            label: "Formaciones",
            icon:()=>(<GiSoccerField size={25}/>),
            component: (id) => (<Lineups id={id} />)
        })
    }

    if (game.events != undefined) {
        tabs.push({
            name: "events",
            label: "Eventos",
            icon:()=>(<MdMenu size={25}/>),
            component: (id) => (<Events id={id}/>)
        })
    }

    tabs.push({
        name: "prev",
        label: "Previa",
        icon:()=>(<BiHistory size={25}/>),
        component: (id) => (<Prev id={id} />)
    })

    if (game.statistics != undefined) {
        tabs.push({
            name: "stats",
            label: "Estadísticas",
            icon:()=>(<BarChartIcon  size={25}/>),
            component: (id) => (<Stats id={id}/>)
        })
    }

    return tabs
}