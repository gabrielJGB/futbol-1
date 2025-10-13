// @ts-nocheck
import { useEffect, useState } from "preact/hooks";
import { useLocation } from 'preact-iso'
import React from 'react'
import { usePlayer } from './usePlayer';
import { fetcher } from '../../utils/fetcher';
// import player from '../../../PLAYER2.json'
import { MdStadium } from 'react-icons/md'

const Player = ({ name }) => {
    const [player, setPlayer] = useState(false)
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState(false)
    const [eventsInfo, setEventsInfo] = useState(false)
    const [stats, setStats] = useState(false)





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
                            setStats(player.gameLog.statistics[0])
                            setEvents(player.gameLog.statistics[0].events)
                            setEventsInfo(player.gameLog.events)

                            console.log(player);
                            
                        })
                    })
                }).finally(() => {
                    setLoading(false)
                })

            } else {
                setPlayer(false)
                setLoading(false)
            }

        })
    }, [])

    if (loading)
        return <div class={"text-center mt-10"}>Cargando...</div>

    if (!player)
        return <div class={"text-center mt-10"}>Sin datos del jugador</div>


    console.log(player);



    const getResultColor = r => r === "G" ? "bg-green-400" : r === "P" ? "bg-red-400" : "bg-yellow-300";


    return (
        <div class={"pb-20 px-2 w-full"}>
            <div class="player-card  text-white rounded-2xl   mx-auto flex flex-col md:flex-row md:items-start md:gap-8  transition-all duration-300">


                <div class="flex-1 flex flex-col gap-3">
                    <div class="flex items-center justify-between border-b-2 border-[#C2E213] pb-2">
                        <div class="text-5xl font-bold text-[#C2E213]">{player.athlete.displayJersey}</div>
                        <div class="md:text-4xl text-3xl text-right font-semibold">{player.athlete.fullName}</div>
                    </div>

                    <div class="flex flex-col gap-2 mt-2">
                        <div class="flex items-center gap-2">
                            <img src={player.athlete.flag.href} class="w-6 rounded-sm" alt="" />
                            <span class="text-sm md:text-base">{player.athlete.citizenship}</span>
                        </div>
                        <div class="grid grid-cols-2 gap-x-4 text-sm md:text-base">
                            <div><span class="opacity-70 text-xs">Altura:</span> {player.athlete.displayHeight}</div>
                            <div><span class="opacity-70 text-xs">Peso:</span> {player.athlete.displayWeight}</div>
                            <div><span class="opacity-70 text-xs">Nacimiento:</span> {player.athlete.displayDOB}</div>
                            <div><span class="opacity-70 text-xs">Posición:</span> {player.athlete.position.displayName}</div>
                        </div>
                    </div>
                </div>


                <div class="flex-1 bg-[#2a2a2a] p-4 rounded-xl flex flex-col gap-2 mt-4 md:mt-0">
                    <h3 class="text-[#C2E213] font-semibold uppercase text-sm">Equipo</h3>
                    <div class="flex items-center gap-3">
                        <img src={player.athlete.team.logos[0].href} class="w-10 h-10 rounded-md" alt="" />
                        <div class="text-lg font-medium">{player.athlete.team.displayName}</div>
                    </div>
                    <div class="text-sm opacity-90 mt-1">
                        {/* check data: */}
                        <div>{player.athlete.team.defaultLeague.displayName}</div>
                        <div>{player.athlete.team.venue.fullName}</div> 
                        <div>{player.athlete.team.venue.address.city}, {player.athlete.team.venue.address.country}</div>
                    </div>
                </div>


                <div class="flex-1 bg-[#2a2a2a] p-4 rounded-xl flex flex-col gap-2 mt-4 md:mt-0">
                    <h3 class="text-[#C2E213] font-semibold uppercase text-sm">Liga</h3>
                    <div class="flex items-center gap-3">
                        <img src={player.league.logos[0].href} class="w-10 h-10 rounded-md" alt="" />
                        <div class="text-lg font-medium">{player.league.name.replace("Argentine", "Argentina")}</div>
                    </div>
                </div>
            </div>


            <div class={"text-lg font-semibold w-full mx-auto my-1 text-[#C2E213]"}>PROXIMO PARTIDO</div>
            <div>{player.nextGame.league.events[0].seasonName}</div>
            <div>{player.nextGame.league.events[0].date}</div>
            <div>{player.nextGame.league.events[0].name.replace(" en ", " vs ")}</div>


            <div class={"text-lg font-semibold w-full mx-auto my-1 text-[#C2E213]"}>ULTIMOS 5 PARTIDOS</div>

            <div class=" text-white rounded   mx-auto overflow-x-auto">



                <table class={"shadow  shadow-gray-900 bg-gray-500 w-auto  border-separate border-spacing-[2px] rounded"} >
                    <thead>
                        <tr class="bg-black text-[#C2E213] uppercase  text-xs">
                            <th class="p-1 w-[80px] text-center">Fecha</th>
                            <th class="p-1 w-[80px] text-center">Rival</th>
                            <th class="p-1 w-[80px] text-center">Resultado</th>
                            <th class="p-1 w-[80px] text-center">Competición</th>
                            {stats.displayNames.map((n, i) => (
                                <th key={i} class="w-[80px] p-1 text-center text-xs ">
                                    {n}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {events.map((event, i) => {
                            const info = eventsInfo[event.eventId];
                            if (!info) return null;

                            const date = new Date(info.gameDate).toLocaleDateString("es-AR", {
                                day: "2-digit",
                                month: "short",
                            });

                            return (
                                <tr class={`border-b border-[#333] ${i % 2 === 0 ? "bg-gray-300" : "bg-gray-400"}`}>
                                    <td class="px-2 text-black text-sm font-semibold ">{date}</td>
                                    <td title={info.opponent.displayName} class=" flex flex-col justify-center items-center  flex-1 text-black pt-2 gap-0">
                                        <img src={info.opponent.logo} alt="logo" class="w-8" />
                                        <a
                                            href={info.links.find((l) => l.rel.includes("summary"))?.href}
                                            target="_blank"
                                            class="hover:underline text-sm w-max"
                                        >
                                            {info.opponent.abbreviation}
                                        </a>
                                    </td>
                                    <td class={`p-2 text-2xl   text-center font-bold text-black  ${getResultColor(info.gameResult)}`}>
                                        {info.score}
                                    </td>
                                    <td class="px-2  py-1 text-xs text-center text-black">{info.leagueShortName}</td>
                                    {event.stats.map((s, i) => (
                                        <td key={i} class="px-2 text-center  text-black">
                                            {s}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>


            <div class={"text-lg font-semibold w-full mx-auto my-1 text-[#C2E213]"}>ESTADISTICAS</div>

            <div class="overflow-x-auto ">
                <table class={"shadow shadow-gray-900  bg-gray-500 w-auto  border-separate border-spacing-[2px] rounded"} >

                    <thead class={"bg-black text-[#C2E213] uppercase text-xs"}>

                        <tr>
                            <th class={" text-xs p-1 text-center bg-black"}>Competicion</th>
                            {
                                player.statistics.displayNames.map(stat => (<th class={"p-1 text-xs  text-center bg-black"}>{stat.replace("Aperturas", "Titular")}</th>))
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {
                            player.statistics.splits.map((competition, i) => (
                                <tr class={`${i % 2 === 0 ? "bg-gray-300" : "bg-gray-400"}`}>
                                    <td class={" text-center text-sm p-1 font-semibold text-black"}>{competition.displayName.replace("Argentine", "Argentina")}</td>
                                    {
                                        competition.stats.map((item) => (
                                            <td class={"text-center text-black"}>{item}</td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


            <div class={"text-lg font-semibold w-full mx-auto my-1 text-[#C2E213]"}>TRAYECTORIA</div>

            <div class={"flex flex-row flex-wrap gap-2 mx-auto w-full"}>
                {
                    player.teamHistory.map((team) => (
                        <div class={"md:w-[200px] w-full shadow shadow-gray-800 flex flex-col justify-start items-center p-1 rounded-lg bg-green-800"}>
                            {
                                "logo" in team ?
                                    <img src={"logo" in team ? team.logo : team.logos[0].href} class={"w-10"} alt="" />
                                    : <></>
                            }
                            <div class={"text-center font-semibold"}>{team.displayName}</div>
                            <div class={"text-center text-sm text-gray-200"}>{team.seasonCount}  Temporada{parseInt(team.seasonCount) > 1 ? "s" : ""}</div>
                            <div class={"text-center text-sm text-gray-200"}>{team.seasons}</div>
                        </div>
                    ))
                }
            </div>

            <div class={"text-lg font-semibold w-full mx-auto my-1 text-[#C2E213]"}>NOTICIAS</div>
            <div class={"flex md:flex-row flex-wrap flex-col gap-4"}>
                {
                    player.news.map((article) => (
                        <article class={"flex flex-col gap-1 md:w-[300px] bg-[#2a2a2a] shadow shadow-gray-900 rounded-lg p-2"}>
                            <div class={"font-extrabold text-2xl "}>{article.headline}</div>
                            {
                                "images" in article &&
                                <img src={article.images[0].url} class={"w-[400px]"} alt={"Imagen"} />
                            }
                            <div class={"text-xs text-gray-200 font-semibold italic "}>{article.published}</div>
                            <div class={"text-xs text-gray-200"}>{article.description}</div>
                        </article>
                    ))
                }
            </div>
        </div>
    )
}

export default Player