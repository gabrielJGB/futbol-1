
import today from '@/data/dummy/TODAY.json'
import { GameCard, LeagueCard, SortedGames } from '@/components/home'
import { showOnlyLive } from '@/signals/home'
import { useEffect } from 'preact/hooks'
import { useLocation } from 'preact-iso'
import ButtonBase from '@mui/material/ButtonBase'
import Button from '@mui/material/Button'
import TouchRipple from '@mui/material/ButtonBase/TouchRipple'



const Testpage = ({ }) => {

    // @ts-ignore
    // const games = today.leagues.flatMap(league => (league.games))
    // const orderedByDate = games.sort((a, b) => {
    //     return (parseInt(a.start_time.split(" ")[1]) - parseInt(b.start_time.split(" ")[1]))
    // })
    const { query,path,route,url } = useLocation()
    const leagues = today.leagues

    useEffect(() => {
    
        showOnlyLive.value = query.live === "true"

    }, [])



    return (
        <div class={"md:col-start-2 col-start-1 flex flex-col gap-4 p-1 md:w-1/2 w-full mx-auto"}>
            {/* {
                leagues.map((league, i) => (
                    <LeagueCard key={i} league={league} />
                ))
            } */}


            

        </div>
    )
}

export default Testpage