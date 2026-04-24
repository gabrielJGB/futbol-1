import { darkMode } from "@/signals/common"

const LoadingLeagues = () => {
    return (
        <div class={"flex flex-col gap-8 w-full mt-2 mb-2"}>
            {
                Array.from({ length: 3 }).map(() => (
                    <LeagueCard />
                ))
            }
        </div>
    )
}

export default LoadingLeagues



const LeagueCard = () => (
    <div class={`flex flex-col gap-[1px] animate-pulse justify-center items-center  shadow shadow-gray-900 w-full border-[1px] border-slate-500 ${darkMode.value?"bg-slate-700":"bg-slate-400"}`}>

        <div class={"h-[35px] bg-[#002D29]  pb-[5px] pt-[3px] px-[4px] border-gray-500   flex items-center justify-between w-full"}>
        </div>

        {
            Array.from({ length: 4 }).map(() => (
                <GameCard />
            ))
        }


    </div>
)


const GameCard = () => (
    <div class={`grid grid-cols-26 w-full gap-[1px] ${darkMode.value ? "bg-slate-800" : "bg-gray-400"}  text-white text-sm`}>
        <div class={"col-span-3 h-[44px] bg-[#015A1C] "}></div>
        <div class={`col-span-8 h-[44px] ${darkMode.value ? "bg-slate-950/80" : "bg-gray-200"}`}></div>
        <div class={`col-span-2 h-[44px] ${darkMode.value ? "bg-slate-900" : "bg-white"}`}></div>
        <div class={`col-span-2 h-[44px] ${darkMode.value ? "bg-slate-900" : "bg-white"}`}></div>
        <div class={`col-span-8 h-[44px] ${darkMode.value ? "bg-slate-950/80" : "bg-gray-200"}`}></div>
        <div class={"col-span-3 h-[44px] bg-[#008000] text-white  text-center font-bold flex items-center justify-center"}></div>

    </div>
)


