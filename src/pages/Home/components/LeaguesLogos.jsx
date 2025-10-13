import { Link } from 'preact-router/match'
import React from 'react'

const LeaguesLogos = ({leagues}) => {
    return (
        <div class={"relative flex flex-row gap-4 items-center justify-center flex-wrap pt-3 px-1"}>
            {
                leagues.map((l) => (
                    <Link 
// @ts-ignore
                    href={`/league/${l.id}`} class={"relative  cursor-pointer hover:scale-120 transition-all"}>
                        {/* <img
                            src={`https://api.promiedos.com.ar/images/country/${l.country_id}/1`}
                            class={" -bottom-1  -right-1 h-5"}

                        /> */}
                        <img
                            src={`https://api.promiedos.com.ar/images/league/${l.id}/1`}
                            class={"h-8"}
                            title={l.name}
                        />

                        <div class={"absolute left-3 text-[10px] mt-[3px] text-center font-semibold "}>{l.games.length}</div>
                    </Link>
                ))
            }
        </div>

    )
}

export default LeaguesLogos