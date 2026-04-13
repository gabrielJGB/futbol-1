import { useEffect } from "preact/hooks";


export const TeamHeader = ({ id, competitor, main_league, team_info }) => {
    if (!competitor) return null;

    let bgColor = competitor.colors?.color || "#1e3a8a";
    let textColor = competitor.colors?.text_color || "#ffffff";

    if (id === "igg")
        textColor = "yellow"


    useEffect(() => {
        document.title = competitor.name + " - Fútbol 1"
    }, [])


    return (
        <div
            class="flex flex-col sm:flex-row justify-between backdrop-blur-md  items-center rounded-2xl p-5 mt-3 shadow-lg border-2 "
            style={{ borderColor: bgColor,backgroundColor:bgColor, color: textColor }}
        >
            <div class="flex items-center gap-4">
                <img
                    src={`https://api.promiedos.com.ar/images/team/${competitor.id}/1`}
                    alt={competitor.name}
                    class="w-16 h-16 object-contain drop-shadow-xs drop-shadow-black"
                />
                <div>
                    <h1 class="text-3xl text-shadow-xs text-shadow-black font-bold">{competitor.name}</h1>
                    {main_league && (
                        <p class="font-semibold flex items-center gap-1 opacity-80 text-sm mt-1">
                            <img src={`https://api.promiedos.com.ar/images/league/${main_league.id}/1`} alt="Logo" className="h-5 drop-shadow-xs drop-shadow-black" />
                            {main_league.name}
                        </p>
                    )}
                </div>
            </div>
            {team_info && (
                <div class="flex flex-col mt-4 sm:mt-0 text-left opacity-80">
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
