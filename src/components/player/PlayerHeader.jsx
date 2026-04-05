import { usePlayer } from "@/hooks/usePlayer";
import injury from '@/assets/injury.png'

const PlayerHeader = ({ name }) => {

    const { player } = usePlayer(name)

    console.log(player);


    return (
        <div class={"grid md:grid-cols-2 grid-cols-1 md:gap-0 gap-0 md:m-0 m-0 text-white  border-white/10  overflow-hidden "}>

            <div class={"relative flex gap-2 md:items-start items-center md:p-3 px-3 py-1 bg-[#0e3e1d]"}>
                {getImgElement(player.id, "player", 70)}
                <div>
                    <div class={"text-[#C2E213] font-bold md:text-[27px] text-[25px] text-shadow-xs text-shadow-black leading-tight"}>
                        {player.name}
                    </div>
                    <div class={"text-sm font-semibold text-gray-300 tracking-wider"}>
                        {player.formationPosition?.name}
                    </div>

                    {
                        player.injury != undefined &&
                        <div class={"flex flex-col mt-1"}>
                            <div class={"flex flex-row items-center gap-1"}>
                                <img src={injury} style={{ width: 14, height: 14 }} />
                                <div class={"text-red-300 text-xs"}>{player.injury.name} ({new Date(player.injury.startDate).toLocaleDateString()})</div>
                            </div>
                        </div>
                    }
                </div>
            </div>


            <div class={"px-3 bg-[#0e3e1d]"}>
                <div class={" grid grid-cols-2 gap-px  md:border-y-0 border-y border-white/10"}>

                    <div class={" p-2 flex items-center gap-2"}>

                        {getImgElement(player.nationalTeamId, "flag")}

                        <div class={" leading-tight"}>
                            <div class={"font-semibold text-gray-200"}>{player.nationalityName}</div>
                            <div class={"text-[10px] text-gray-400"}>{player.nationalTeamStatsText}</div>
                        </div>
                    </div>


                    <div class={"bg-[#0e3e1d] p-2 flex items-center gap-2 border-l border-white/10"}>

                        {getImgElement(player.clubId, "team")}

                        <div class={" leading-tight"}>
                            <div class={"font-semibold text-gray-200"}>{player.clubName}</div>
                            {
                                "contractUntil" in player &&
                                <div class={"text-[10px] text-gray-400"}>Fin contrato: {new Date(player.contractUntil).toLocaleDateString()}</div>
                            }
                        </div>
                    </div>
                </div>



                <div class={"bg-[#0e3e1d] grid md:grid-cols-3  grid-cols-2 gap-x-5"}>
                    {player.playerDetails.map((detail) => (
                        <div class={"flex flex-row md:flex-col justify-between items-center border-t border-white/5 py-1"}>
                            <div class={"text-[10px] uppercase text-gray-400"}>{detail.title}</div>
                            <div class={"text-xs font-bold text-[#C2E213]"}>{detail.value != "" ? detail.value : ""}</div>
                        </div>
                    ))}


                </div>
            </div>
        </div>



    )
}


const getImgElement = (id, type, size = 30) => {

    const urls = {
        "team": "https://imagecache.365scores.com/image/upload/f_png,w_34,h_34,c_limit,q_auto:eco,dpr_2,d_Competitors:default1.png/v1/Competitors/",
        "player": "https://imagecache.365scores.com/image/upload/f_png,w_80,h_80,c_limit,q_auto:eco,dpr_2,d_Athletes:default.png,r_max,c_thumb,g_face,z_0.65/Athletes/",
        "flag": "https://imagecache.365scores.com/image/upload/f_png,w_40,h_40,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v15/Competitors/"
    }

    const url = `${urls[type]}${id}`

    return <img src={url} width={size} height={size} />


}


export default PlayerHeader