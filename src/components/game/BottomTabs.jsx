
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import { selectedTab } from '@/signals/game';
import { GiSoccerField } from 'react-icons/gi';
import { useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';


export default function BottomTabs({ tabs,id }) {

    const [isMobile] = useState(window.innerWidth < 768)
    const { route,query } = useLocation()
    const [value, setValue] = useState(query.tab ?? 0)

    return (
        
        <Box  sx={{ width: "auto", position: isMobile ? "sticky" : "unset", top: isMobile ? 0 : "unset", bottom: isMobile ? 0 : "unset" }}>

            <BottomNavigation
                showLabels
                style={{ backgroundColor: "rgb(14,62,29 ,0.98)" }}
                // @ts-ignore
                value={parseInt(value)}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    route(`/game/${id}?tab=${newValue}`,true);
                    selectedTab.value = newValue

                }}
            >

                {
                    tabs.map((tab, i) => (

                        <BottomNavigationAction
                            key={i}
                            label={tab.label}
                            icon={tab.icon()}
                            sx={{

                                color: '#e5e5e5',
                                '&.Mui-selected': { color: '#C2E213' }
                            }}
                        />
                    ))
                }


            </BottomNavigation>
        </Box>
        
    );
}
