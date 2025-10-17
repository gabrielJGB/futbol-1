import React from 'react'
import SectionTitle from './SectionTitle'
import { Link } from 'preact-router/match'

const Related = ({ title, player }) => {

    if (!("playerSwitcher" in player))
        return;

    const players = player.playerSwitcher.athletes

    return (
        <div class={"flex flex-col"}>
            <SectionTitle title={title} />

            <div class={"flex md:flex-row flex-wrap flex-col gap-1"}>
                {
                    players.map(player => (
                        <Link
                            // @ts-ignore
                            href={`/player/${player.displayName}`} class={"px-2 bg-gray-900/50  hover:bg-gray-900/90  p-1 rounded "}>{player.displayJersey} {player.displayName}</Link>
                    ))
                }
            </div>

        </div>
    )
}

export default Related