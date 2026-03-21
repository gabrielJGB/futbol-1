import RosterPlayer from "@/components/game/lineups/RosterPlayer"
import { invertLines, } from "@/signals/game"

const Roster = ({team }) => {


    

    return (


        <div class={`flex flex-col w-full row-start-1 col-span-1 ${team.isHome ? (invertLines.value ? "col-start-2" : "col-start-1") : (invertLines.value ? "col-start-1" : "col-start-2 ")} `}>

            <div style={{ backgroundColor: team.colors.color, color: team.colors.text_color }} class={`py-1 text-lg text-center font-semibold shadow shadow-gray-800`}>{team.name}</div>



            <div class={`bg-[#032E15] py-2 text-[#C2E213] text-xs text-center font-semibold shadow shadow-gray-800`}>TITULARES</div>

            <div class={"flex flex-col divide-y-[1px] divide-[#073f18] shadow shadow-gray-800"}>
                {
                    team.starting.map((player, i) => (
                        <RosterPlayer key={i} player={player} isBench={false} missingReason={false} />
                    ))
                }
            </div>

            <div class={"flex flex-row items-center border-t-[1px] border-[#015A1C] bg-white font-semibold text-black text-sm p-1"}>DT:
                <img src={`https://api.promiedos.com.ar/images/country/${team.staff[0].country_id}/1`} alt="Logo" className="h-5 w-5 mx-1" />
                <div>{team.staff[0].name}</div>
            </div>

            <div class={"bg-[#032E15] py-2 text-[#ffffff] text-xs text-center font-semibold shadow shadow-gray-800"}>SUPLENTES</div>

            <div class={"flex flex-col divide-y-[2px] divide-[#024817] shadow shadow-gray-800"}>
                {
                    team.bench.map((player, i) => (
                        <RosterPlayer player={player} isBench={true} missingReason={false} />
                    ))
                }
            </div>


            {
                team.missing  &&
                <>
                    <div class={"bg-[#032E15] py-2 text-red-500 text-xs text-center font-semibold shadow shadow-gray-800"}>BAJAS</div>

                    {
                        <div class={"flex flex-col divide-y-[2px] divide-[#024817] shadow shadow-gray-800"}>
                            {
                                team.missing.length > 0 ?
                                    team.missing.map((player, j) => (
                                        <RosterPlayer player={player} isBench={true} missingReason={player.missing_details?.reason} />
                                    ))
                                    :
                                    <div class={"text-xs text-center bg-[#015A1C] py-2"}>
                                        Sin bajas
                                    </div>
                            }
                        </div>
                    }

                </>
            }



        </div>

    )
}

export default Roster