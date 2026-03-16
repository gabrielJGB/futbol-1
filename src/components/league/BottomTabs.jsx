

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { selectedTab } from '@/signals/league';
import { useEffect, useState } from 'preact/hooks';
import Box from '@mui/material/Box';
import { useLeague } from '@/hooks/useLeague';
import { BarChartIcon, CalendarClock, CalendarRangeIcon, CurlyBraces, HomeIcon, List, LucideBrackets, LucideListOrdered } from 'lucide-preact';
import { MdSchedule } from 'react-icons/md';
import { BiBracket, BiCodeCurly, BiTable } from 'react-icons/bi';
import { GiCurlyWing } from 'react-icons/gi';



export default function BottomTabs({ id }) {

    const [width, setWidth] = useState(window.innerWidth)
    const { league } = useLeague(id)

    const sx = {
        color: '#e5e5e5',
        '&.Mui-selected': { color: '#C2E213' }
    }

    useEffect(() => {
        setWidth(window.innerWidth)
    }, [window.innerWidth])





    return (

        <div class={"sticky md:relative md:order-none"}>

            <BottomNavigation
                showLabels
                style={{ backgroundColor: "rgb(14,62,29 ,0.98)" }}
                value={selectedTab.value}
                onChange={(event, newValue) => { selectedTab.value = newValue }}
            >

                <BottomNavigationAction
                    hidden={width < 768}
                    label="Principal"
                    value={"principal"}
                    icon={(<HomeIcon size={25}/>)}
                    sx={sx} />

                <BottomNavigationAction
                    hidden={width > 768}
                    label="Fixture"
                    value={"fixture"}
                    icon={(<CalendarRangeIcon size={25}/>)}
                    sx={sx} />


                {
                    league.tables_groups != undefined &&

                    <BottomNavigationAction
                        hidden={width > 768}
                        label="Posiciones"
                        value={"tablas"}
                        icon={(<LucideListOrdered size={25}/>)}
                        sx={sx} />
                }


                {
                    league.brackets != undefined &&

                    <BottomNavigationAction
                        label="Llaves"
                        value={"llaves"}
                        icon={(<CurlyBraces size={25}/>)}
                        sx={sx} />
                        
                }


                {
                    league.players_statistics != undefined &&

                    <BottomNavigationAction
                        label="Estadísticas"
                        value={"estadisticas"}
                        icon={(<BarChartIcon size={25}/>)}
                        sx={sx} />
                }


            </BottomNavigation>

        </div>

    );
}
