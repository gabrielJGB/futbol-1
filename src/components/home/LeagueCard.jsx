// @ts-nocheck
import { h } from "preact";
import { Link } from "preact-router/match";
import GameCard from "@/components/home/GameCard";
import { showOnlyLive } from "@/signals/home";


export default function LeagueCard({ league }) {

    const { id: leagueId, games, show_country_flags: showCountryFlags, country_id, name: leagueName } = league
    const countryFlagURL = `https://api.promiedos.com.ar/images/country/${country_id}/1`
    const leagueLogoURL = `https://api.promiedos.com.ar/images/league/${leagueId}/1`
    const hasActiveGame = checkForActiveGame(league.games)

    if (showOnlyLive.value && !hasActiveGame)
        return <></>

    return (
        <div
            
            className=" flex flex-col gap-[0px] justify-center items-center  w-full border-[1px] border-gray-500 ">

            <Link href={`/league/${leagueId}`} className=" active:bg-[#024640] hover:bg-[#024640] bg-[#002D29] border-b-[1px] pb-[5px] pt-[3px] px-[4px] border-gray-500 flex items-center justify-between w-full">

                <img src={leagueLogoURL} style={{ height: 24, width: 24 }} alt="Logo" loading={"lazy"} />

                <span className="text-white text-sm md:text-[15px] cursor-pointer font-bold uppercase">
                    {leagueName}
                </span>

                <img src={countryFlagURL} style={{ height: 24, width: 24 }} alt="Logo" loading={"lazy"} />

            </Link>

            {
                games.map((game, i) => (
                    <GameCard
                        index={i}
                        key={game.id}
                        game={game}
                        showCountryFlags={showCountryFlags}
                    />
                ))
            }

        </div>
    );
}



export const checkForActiveGame = (objeto) => {

    if (objeto.hasOwnProperty("enum") && objeto["enum"] === 2) {
        return true;
    }

    for (let propiedad in objeto) {
        if (objeto[propiedad] !== null && typeof objeto[propiedad] === "object") {
            let resultado = checkForActiveGame(objeto[propiedad], "enum");
            if (resultado) {
                return true;
            }
        }
    }

    return false;
}