
import red from '../../../assets/red.png'
import yellow from '../../../assets/yellow.png'
import goal from '../../../assets/goal.png'
import ownGoal from '../../../assets/own-goal.png'
import arrowIn from '../../../assets/arrow-in.png'
import arrowOut from '../../../assets/arrow-out.png'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { Link } from 'preact-router/match'

const getPosText = (position) => {

    if (position === "Arquero")
        return "ARQ"
    else if (position === "Defensor")
        return "DEF"
    else if (position === "Mediocampista")
        return "MED"
    else if (position === "Delantero")
        return "DEL"
    else
        return "-"

}

const getPosColor = (position) => {

    if (position === "Arquero")
        return "text-orange-500"
    else if (position === "Defensor")
        return "text-blue-500"
    else if (position === "Mediocampista")
        return "text-green-400"
    else if (position === "Delantero")
        return "text-red-600"


}


const getEvents = (player, isBench) => {


    let arr = []




    if (player.events?.cards?.yellow)
        arr.push(
            <img src={yellow} className="h-3 " />
        )

    if (player.events?.cards?.red)
        arr.push(<img src={red} className="h-3 " />)


    let goals = Array.from({ length: player.events?.goals?.goals }).map((_, i) => (
        <img src={goal} className="h-3 " />
    ))

    arr.push(goals)

    if (player.events?.substitution?.has_substitution) {
        if (isBench)
            arr.push(
                <div class={"flex flex-wrap items-center gap-1 text-gray-400 text-xs font-semibold"}>
                    
                    <BiChevronRight color='lime' size={20} />
                    <span>{player.events.substitution.time}'</span>
                </div>
            )
        else
            arr.push(
                <div class={"flex flex-wrap items-center gap-1 text-gray-400 text-xs font-semibold"}>
                    <BiChevronLeft color='red' size={20}  />
                    <span>{player.events.substitution.time}'</span>
                </div>

            )
    }





    return arr

}


const RosterPlayer = ({ player, isBench, missingReason }) => {



    return (
        <div class={"flex flex-row justify-between items-center px-0 py-0 bg-[#015A1C] text-sm"}>

            <div class={"flex flex-row items-center"}>


                <div
                    title={player.formation_position}
                    class={`${getPosColor(player.position)} ml-1 rounded w-[34px] text-center py-1 bg-black text-xs font-semibold`}>
                    {getPosText(player.position)}
                </div>

                <div
                    class={`rounded  m-1 font-semibold text-xs w-[30px] ${player.is_captain ? "bg-blue-600  border-white" : "bg-white text-black"} py-1 text-center`}>
                    {player.jersey_num}
                </div>

                <img src={`https://api.promiedos.com.ar/images/country/${player.country_id}/1`} alt="Logo" className="h-5 w-5 mx-1" />

                <Link 
// @ts-ignore
                href={`/player/${player.name}`} class={"text-shadow-xs text-shadow-black hover:underline"}>{player.name}</Link>
                {/* <a target={"_blank"} href={`https://www.google.com/search?q=${player.name}`} class={"text-shadow-xs text-shadow-black hover:underline"}>
                    {player.name}
                </a> */}
                {
                    missingReason &&
                    <div class={"pl-2 text-sm text-white text-shadow-xs text-shadow-gray-900"}>
                        [{missingReason}]
                    </div>
                }

                <div class={"flex items-center flex-warp gap-1 px-1"}>
                    {getEvents(player, isBench).map((x) => x)}
                </div>

            </div>

            <div class={"w-15 flex flex-row justify-between text-xs text-orange-300 pr-1"}>
                <div title="Altura" class={""}>{player.height ? player.height : ""}</div>
                <div title="Edad" class={""}>{player.age}</div>
            </div>

        </div>
    )
}

export default RosterPlayer