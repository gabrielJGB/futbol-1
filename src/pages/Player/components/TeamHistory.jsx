import { useEffect, useState } from "preact/hooks";
import SectionTitle from './SectionTitle'

const TeamHistory = ({ title, player }) => {




    const teamHistory = player.teamHistory.map((team) => (
        {
            ...team,
            year_start: parseInt(team.seasons.slice(0, 4))
        }
    )).sort((a, b) => (a.year_start - b.year_start))




    return (
        <div class={"flex flex-col "}>
            <SectionTitle title={title} />

            <div class={"overflow-x-auto"}>
                <div class={"flex gap-2"}>
                    {
                        teamHistory.map((team) => (
                            <div class={"min-w-[200px] max-w-[200px] md:flex-wrap shadow shadow-gray-800 flex flex-col justify-start items-center p-1 rounded-lg bg-green-800"}>
                                {
                                    "logo" in team ?
                                        <img src={"logo" in team ? team.logo : team.logos[0].href} class={"w-10"} alt="" />
                                        : <></>
                                }
                                <div class={"text-center font-semibold"}>{team.displayName}</div>
                                <div class={"text-center text-sm text-gray-200"}>{team.seasonCount}  Temporada{parseInt(team.seasonCount) > 1 ? "s" : ""}</div>
                                <div class={"text-center text-sm text-gray-200"}>{team.seasons}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default TeamHistory