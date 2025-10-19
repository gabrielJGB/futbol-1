// @ts-nocheck
import { useEffect, useState } from "preact/hooks";
import { useLocation } from 'preact-iso'
import React from 'react'
import { usePlayer } from './usePlayer';
import { fetcher } from '../../utils/fetcher';
import player from '../../../PLAYER2.json'
import { MdStadium } from 'react-icons/md'
import { BiCalendar } from "react-icons/bi";
import { MapPin } from "lucide-preact";
import PlayerInfo from "./components/PlayerInfo";
import NextGame from "./components/NextGame";
import TeamHistory from "./components/TeamHistory";
import Stats from "./components/Stats";
import Last5Games from "./components/Last5Games";
import News from "./components/News";
import Related from "./components/Related";
import Tabs from "./components/Tabs";

const Player = ({ name }) => {
    const [loading, setLoading] = useState(false)
    const [player, setPlayer] = useState(false)
    const [events, setEvents] = useState(false)
    const [eventsInfo, setEventsInfo] = useState(false)
    const [stats, setStats] = useState(false)

    // const [events, setEvents] = useState(player.gameLog.statistics[0].events)
    // const [eventsInfo, setEventsInfo] = useState(player.gameLog.events)
    // const [stats, setStats] = useState(player.gameLog.statistics[0])
    // const [tabs, setTabs] = useState([])
    // const [active, setActive] = useState(null)


    useEffect(() => {
        setLoading(true)
        const url = `https://site.web.api.espn.com/apis/search/v2?region=ar&lang=es&limit=10&page=1&dtciVideoSearch=true&query=${name}`
        fetcher(url).then((res) => {
            console.log(res);

            if (res.totalFound > 0 && res.results[0].totalFound > 0 && res.results[0].type === "player") {
                const player = res.results[0].contents[0]
                const id = player.uid.split("a:")[1]

                const url1 = `https://site.web.api.espn.com/apis/common/v3/sports/soccer/athletes/${id}/bio?region=ar&lang=es`
                const url2 = `https://site.web.api.espn.com/apis/common/v3/sports/soccer/athletes/${id}?region=ar&lang=es`
                const url3 = `https://site.web.api.espn.com/apis/common/v3/sports/soccer/athletes/${id}/overview?region=ar&lang=es`

                fetcher(url1).then(res1 => {
                    fetcher(url2).then(res2 => {
                        fetcher(url3).then(res3 => {
                            const player = { ...res1, ...res2, ...res3 }
                            setPlayer(player)
                            setStats("gameLog" in player && player.gameLog.statistics[0])
                            setEvents("gameLog" in player && player.gameLog.statistics[0].events)
                            setEventsInfo("gameLog" in player && player.gameLog.events)

                        }).finally(() => {
                            setLoading(false)
                        })
                    })
                })

            } else {
                setPlayer(-1)
                setLoading(false)
            }

        })
    }, [name])

    if (loading)
        return <div class={"text-center mt-10"}>Cargando...</div>

    if (!player)
        return <div class={"text-center mt-10"}>Sin datos del jugador</div>


    const getResultColor = r => r === "G" ? "bg-green-400" : r === "P" ? "bg-red-400" : "bg-yellow-300";


    return (
        <div class={"relative"}>


            <div class={"md:px-40 pb-40 px-2"}>
                <PlayerInfo title={"Resumen"} player={player} setTabs={setTabs} />
                <NextGame title={"Próximo partido"} player={player} setTabs={setTabs} />
                <Last5Games title={"Últimos partidos"} stats={stats} events={events} eventsInfo={eventsInfo} setTabs={setTabs} />
                <Stats title={"Estadísticas"} player={player} setTabs={setTabs} />
                <TeamHistory title={"Trayectoria"} player={player} setTabs={setTabs} />
                <News title={"Noticias"} player={player} setTabs={setTabs} />
                <Related title={"Relacionado"} player={player} setTabs={setTabs} />
            </div>

            <Tabs tabs={tabs} />
        </div>
    )
}

export default Player