import {  MapPin } from 'lucide-preact'
import { useEffect, useRef } from 'preact/hooks';
import { MdStadium } from 'react-icons/md'

const PlayerInfo = ({ player, setTabs,title }) => {

    if (!("athlete" in player))
        return;

    const ref = useRef()

    useEffect(() => {
        setTabs(prev => [...prev, {title,ref}])

    }, [])


    return (
        <div ref={ref} class="text-white rounded-2xl   mx-auto  grid md:grid-cols-[3fr_2fr] grid-cols-1  md:gap-20 gap-1 transition-all duration-300">


            <div class="flex-1 flex flex-col gap-3">
                <div class="flex items-center  gap-2 justify-between border-b-2 border-[#C2E213] pb-2">
                    <div class="md:text-[40px] text-3xl text-left  font-semibold">{player.athlete.fullName}</div>
                    <div class="text-5xl font-bold text-[#C2E213]">{player.athlete.displayJersey}</div>
                </div>

                <div class="flex flex-col gap-0 mt-2">

                    <div class={"flex flex-row "}>
                        {
                            "headshot" in player.athlete &&
                            <img src={player.athlete.headshot.href} class={"w-50"} />
                        }
                        <div class="flex flex-col gap-0 flex-wrap pl-6 text-sm md:text-base">
                            <li class="flex items-center gap-2">
                                <img src={player.athlete.flag.href} class="w-8 rounded-sm" alt="" />
                                <span class="text-lg md:text-base font-semibold">{player.athlete.citizenship}</span>
                            </li>
                            {
                                !player.athlete.active &&
                                <li><span class="font-semibold text-red-500 text-xs">RETIRADO </span></li>
                            }
                            {
                                player.athlete.displayHeight &&
                                <li>
                                    <span class="opacity-70 font-semibold text-xs">Altura:</span> {player.athlete.displayHeight}
                                </li>
                            }
                            {
                                player.athlete.displayWeight &&
                                <li>
                                    <span class="opacity-70 font-semibold text-xs">Peso:</span> {player.athlete.displayWeight}
                                </li>
                            }
                            {
                                player.athlete.displayDOB &&
                                <li><span class="opacity-70 font-semibold text-xs">Nacimiento:</span> {player.athlete.displayDOB}</li>
                            }

                            {
                                player.athlete.displayBirthPlace &&
                                <li><span class="opacity-70 font-semibold text-xs">Lugar:</span> {player.athlete.displayBirthPlace}</li>
                            }
                            {
                                player.athlete.position.displayName &&
                                <li><span class="opacity-70 font-semibold text-xs">Posición:</span> {player.athlete.position.displayName}</li>
                            }



                        </div>
                    </div>
                </div>
            </div>

            <div class={"flex flex-col md:gap-4 gap-1"}>

                <div class="flex-1 bg-[#2a2a2a] p-2 shadow shadow-gray-900 rounded-xl flex flex-col gap-1 mt-4 md:mt-0">
                    <h3 class="text-[#C2E213] font-semibold uppercase text-sm">Equipo</h3>
                    <div class="flex items-center gap-3">

                        <img src={player.athlete.team.logos[0].href} class="w-12 h-12 rounded-md" alt="" />
                        <div class="text-lg font-medium">{player.athlete.team.displayName}</div>
                    </div>
                    {
                        "venue" in player.athlete.team &&
                        <div class="text-sm opacity-90 mt-1">

                            <div class={"flex flex-row items-center gap-2"}>
                                <MdStadium color='white' size={16} />
                                <div>{player.athlete.team.venue.fullName}</div>

                            </div>

                            <div class={"flex flex-row items-center gap-2"}>
                                <MapPin color='white' size={16} />
                                <div>{player.athlete.team.venue.address.city}, {player.athlete.team.venue.address.country}</div>
                            </div>

                        </div>
                    }
                </div>
                <div class="flex-1 bg-[#2a2a2a] p-2 shadow shadow-gray-900 rounded-xl flex flex-col gap-1 mt-4 md:mt-0">
                    <h3 class="text-[#C2E213] font-semibold uppercase text-sm">Liga</h3>
                    <div class="flex items-center gap-3">
                        <img src={player.league.logos[0].href} class="w-12 h-12 rounded-md" alt="" />
                        <div class="text-lg font-medium">{player.league.name.replace("Argentine", "Argentina")}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerInfo