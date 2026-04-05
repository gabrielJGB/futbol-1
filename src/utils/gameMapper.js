export const gameMapper = (game) => {


    return {
        id: game.id,
        startTime: game.start_time,
        isCompleted: game.status.symbol_name === "Fin",
        isHomeWinner: game.winner === 0,
        isAwayWinner: game.winner === 1,
        isPlaying: game.status.enum === 2,
        statusText: getStatusText(game.status.enum, game.start_time, game.game_time_status_to_display, game.status.symbol_name),
        statusColor: getStatusTextColor(game.status.enum, game.status.name),
        roundName: game.stage_round_name ?? false,
        description: game.description ?? false,
        TVLogoURL: getTVLogoURL("tv_networks" in game && game.tv_networks),
        TVName: getTVName("tv_networks" in game && game.tv_networks),
        homeScoreDisplay: "scores" in game ? game.scores[0] : undefined,
        awayScoreDisplay: "scores" in game ? game.scores[1] : undefined,
        homeScorers: "goals" in game.teams[0] ? game.teams[0].goals : [],
        awayScorers: "goals" in game.teams[1] ? game.teams[1].goals : [],
        home: game.teams[0],
        away: game.teams[1],
        winner: game.winner
    }

}


const getTVLogoURL = (tvNetworks) => {

    if (!tvNetworks || tvNetworks[0].id === "hcgc" || tvNetworks[0].id === "igif")
        return false

    return `https://api.promiedos.com.ar/images/tvnetworks/${tvNetworks[0].id}`

}


const getTVName = (tvNetworks) => {

    if (!tvNetworks || tvNetworks[0].id === "hcgc" || tvNetworks[0].id === "igif")
        return false

    return tvNetworks[0].name

}

const getStatusTextColor = (statusCode, statusName) => {

    //programado, aplazado, suspendido
    if (statusCode === 1 || statusName === "Aplazado") {
        return "bg-[#015A1C]"
    }

    //en juego
    else if (statusCode === 2) {
        return "bg-red-800"
    }

    //finalizado (Final, Pen, TE,)
    else if (statusCode === 3) {
        return "bg-gray-950"
    }
}


const getStatusText = (statusCode, startTime, playingDisplayText, statusSymbol) => {


    if (statusCode === 1) {
        return startTime.split(" ")[1]

    }
    else if (statusCode === 2) {
        return playingDisplayText

    }
    else if (statusCode === 3) {
        return (
            statusSymbol
                .replace("Fin", "Final")
                .replace("TE", "T.E.")
                .replace("Apla","Aplaz.")
        )

    }
}