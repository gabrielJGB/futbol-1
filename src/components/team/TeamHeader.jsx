import { useFavorites } from "@/hooks/useFavorites";
import { del, get, set } from "idb-keyval";
import { useEffect, useState } from "preact/hooks";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'


export const TeamHeader = ({ id, competitor, main_league, team_info }) => {
    if (!competitor) return null;

    // const [isFavorite, setIsFavorite] = useState(false)
    let bgColor = competitor.colors?.color || "#1e3a8a";
    let textColor = competitor.colors?.text_color || "#ffffff";

    const { toggleFavorite, isFavorite, loadingFavorites } = useFavorites()

    if (id === "igg")
        textColor = "yellow"


    useEffect(() => {
        document.title = competitor.name + " - Fútbol 1"

        // const checkSaved = async () => {
        //     const saved = await get("favs")
        //     if (saved != undefined)
        //         setIsFavorite(saved.some(f => f.id === competitor.id))

        // }

        // checkSaved()

    }, [])


    // const handleSave = async () => {
    //     const saved = await get("favs")
    //     setIsFavorite(!isFavorite)

    //     //hay guardados
    //     if (saved != undefined) {
    //         // pero ninguno es el equipo actual, lo guardo
    //         if (saved.some(f => f.id != competitor.id)) {
    //             set("favs", [...saved, { name: competitor.name, id: competitor.id }])

    //             //el equipo actual ya esta, lo elimino
    //         } else {
    //             const newSaved = saved.filter(f => f.id != competitor.id)
    //             set("favs", newSaved.length === 0 ? undefined : newSaved)

    //         }

    //         // no hay guardados, lo guardo solo
    //     } else {
    //         set("favs", [{ name: competitor.name, id: competitor.id }])

    //     }



    //     // if (false) {


    //     // if (saved != undefined) {
    //     //     set("favs", [...saved, { name: competitor.name, id: competitor.id }])
    //     // }

    //     // else {
    //     //     set("favs", [{ name: competitor.name, id: competitor.id }])
    //     // }
    //     // setIsFavorite(true)


    //     // } else {

    //     //     // const newSaved = saved.filter(f => f.id != competitor.id)
    //     //     // set("favs", newSaved)
    //     //     setIsFavorite(false)
    //     // }


    // }

    return (
        <div
            class="flex md:flex-row flex-col md:gap-0 gap-4 justify-between rounded-2xl p-5 mt-3 shadow-lg border-2 relative"
            style={{ borderColor: bgColor, backgroundColor: bgColor, color: textColor }}
        >

            <div class="flex flex-row  md:gap-4 gap-1  p-1">
                <img
                    src={`https://api.promiedos.com.ar/images/team/${competitor.id}/1`}
                    alt={competitor.name}
                    class="size-16 object-contain drop-shadow-xs drop-shadow-black"
                />

                <div class={"flex flex-col "}>
                    <div class={"flex flex-row gap-4"}>
                        <h1 class="text-3xl text-shadow-xs text-center text-shadow-black font-bold">
                            {competitor.name}
                        </h1>

                        <div class={"flex "}>

                            {
                                <button
                                    class={"rounded-full p-2 cursor-pointer hover:bg-primary active:bg-primary transition-all hover:text-black"}
                                    onClick={() => { toggleFavorite({ ...competitor, type: "team" }) }} >
                                    {
                                        !loadingFavorites && isFavorite(competitor) ?
                                            <AiFillStar size={25} color={textColor} />
                                            :
                                            <AiOutlineStar size={25} color={textColor} />
                                    }
                                </button>

                            }

                        </div>

                    </div>

                    {main_league && (
                        <p class="md:font-semibold flex items-start gap-1 opacity-80 text-sm mt-1">
                            {/* <img src={`https://api.promiedos.com.ar/images/league/${main_league.id}/1`} alt="Logo" className="h-5 drop-shadow-xs drop-shadow-black" /> */}
                            {main_league.name}
                        </p>
                    )}
                </div>

            </div>


            {team_info && (
                <div class="grid grid-cols-2  md:grid-cols-1   gap-x-4">
                    {
                        team_info.map((team) => (
                            <div>
                                <span class={"text-xs"}>{team.name.replace("Club de", "Ciudad")}: </span>
                                <span class={"font-semibold text-sm"}>{team.value}</span>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    );
};
