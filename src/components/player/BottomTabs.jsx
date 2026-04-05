import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useEffect, useState } from 'preact/hooks';
import { BarChartIcon, CalendarRangeIcon, CurlyBraces, HomeIcon, LucideChevronsRight, LucideListOrdered, Shield, Trophy } from 'lucide-preact';
import { selectedTab } from '@/signals/player';
import { usePlayer } from '@/hooks/usePlayer';



export default function BottomTabs({ name }) {

    const [width, setWidth] = useState(window.innerWidth)
    const { player } = usePlayer(name)

    const sx = {
        color: '#e5e5e5',
        '&.Mui-selected': { color: '#C2E213' }
    }

    useEffect(() => {
        setWidth(window.innerWidth)
    }, [window.innerWidth])





    return (

        <div class={"md:relative fixed  w-full md:w-auto bottom-0 border-t border-white/20 md:order-1"}>

            <BottomNavigation
                showLabels
                style={{ backgroundColor: "rgb(14,62,29 ,0.98)" }}
                value={selectedTab.value}
                onChange={(event, newValue) => { selectedTab.value = newValue }}
            >

                <BottomNavigationAction

                    label="Principal"
                    value={"principal"}
                    icon={(<HomeIcon size={25} />)}
                    sx={sx} />

                <BottomNavigationAction

                    label="Estadísticas"
                    value={"estadisticas"}
                    icon={(<BarChartIcon size={25} />)}
                    sx={sx} />

                <BottomNavigationAction

                    label="Trofeos"
                    value={"trofeos"}
                    icon={(<Trophy size={25} />)}
                    sx={sx} />
                    

                <BottomNavigationAction

                    label="Carrera"
                    value={"transferencias"}
                    icon={(<Shield size={25} />)}
                    sx={sx} />


            </BottomNavigation>

        </div>

    );
}
