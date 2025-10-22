import { useEffect, useRef } from 'preact/hooks';
import SectionTitle from '../../../components/SectionTitle'

const Stats = ({ title, player, setTabs }) => {

    if (!("statistics " in player))
        return;


    const ref = useRef()

    useEffect(() => {
        setTabs(prev => [...prev, { title, ref }])

    }, [])

    return (
        <div ref={ref} class={"flex flex-col"}>
            <SectionTitle title={title} />
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
        </div>
    )
}

export default Stats