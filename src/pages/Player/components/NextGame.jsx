import { useEffect, useRef } from 'preact/hooks';
import SectionTitle from '../../../components/SectionTitle'

const NextGame = ({ title, player,setTabs }) => {

    if (!("league" in player.nextGame))
        return;

    const ref = useRef()

    useEffect(() => {
        setTabs(prev => [...prev, {title,ref}])

    }, [])

    const league = player.nextGame
    const leagueName = league.name
    const game = player.nextGame.league.events[0]
    const gameDate = game.fullStatus.type.detail.replace("at", ", ").replace(" EDT", "").replace("º", "")
    const competitors = game.competitors


    return (
        <div ref={ref} class={"flex flex-col "}>
            <SectionTitle title={title} />
            <div class={"flex flex-col  justify-center items-center bg-[#2a2a2a] md:w-max w-full py-4 px-10 shadow shadow-gray-900 rounded-xl"}>
                <div class={"font-semibold text-lg"}>{leagueName}</div>
                <div class={"text-sm text-gray-300"}>{gameDate}</div>
                <div class={"flex flex-row items-center justify-evenly mt-4"}>


                    <div class={"flex flex-col justify-center items-center"}>
                        <img src={competitors[0].logo} class={"w-15"} alt="Escudo equipo" />
                        <div class={"font-semibold text-center"}>{competitors[0].displayName}</div>
                    </div>

                    <span class={"px-4"}>vs</span>

                    <div class={"flex flex-col justify-center items-center"}>
                        <img src={competitors[1].logo} class={"w-15"} alt="Escudo equipo" />
                        <div class={"font-semibold text-center"}>{competitors[1].displayName}</div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default NextGame