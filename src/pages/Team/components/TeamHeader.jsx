export const TeamHeader = ({ id, competitor, main_league, team_info }) => {
    if (!competitor) return null;

    let bgColor = competitor.colors?.color || "#1e3a8a";
    let textColor = competitor.colors?.text_color || "#ffffff";

    if (id === "igg")
        textColor = "yellow"

    return (
        <div
            class="flex flex-col sm:flex-row justify-between opacity-90 items-center rounded-2xl p-5 mt-3 shadow-lg"
            style={{ backgroundColor: bgColor, color: textColor }}
        >
            <div class="flex items-center gap-4">
                <img
                    src={`https://api.promiedos.com.ar/images/team/${competitor.id}/1`}
                    alt={competitor.name}
                    class="w-16 h-16 object-contain drop-shadow-xs drop-shadow-black"
                />
                <div>
                    <h1 class="text-3xl font-bold">{competitor.name}</h1>
                    {main_league && (
                        <p class="font-semibold flex items-center gap-1 opacity-80 text-sm mt-1">
                            <img src={`https://api.promiedos.com.ar/images/league/${main_league.id}/1`} alt="Logo" className="h-5 drop-" />
                            {main_league.name}
                        </p>
                    )}
                </div>
            </div>
            {team_info && (
                <div class="flex flex-col text-sm mt-3 sm:mt-0 text-right opacity-80">
                    {
                        team_info.map((team) => (
                            <div>
                                <span>{team.name.replace("Club de","Ciudad")}: {team.value}</span>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    );
};
