import { parseDateString } from "./time";

export const getDailyStats = (data) => {
  let competitions = 0;
  let matches = 0;
  let matchesStarted = 0;

  let homeWins = 0;
  let awayWins = 0;
  let draws = 0;

  let goalsTotal = 0;
  let goalsHome = 0;
  let goalsAway = 0;

  let redCards = 0;
  let matchesOver2_5 = 0;

  let topScoringMatch = null;
  let topScoringGoals = -1;

  const goalsByCompetition = {};
  const scorelineCounts = {};

  (data || []).forEach((league) => {
    const leagueGames = league.games || [];
    if (leagueGames.length > 0) competitions++;

    leagueGames.forEach((game) => {
      matches++;

      // comprobamos scores: si existen y tienen al menos 2 valores válidos
      const hasScores =
        Array.isArray(game.scores) &&
        game.scores.length >= 2 &&
        (game.scores[0] !== null && game.scores[0] !== undefined) &&
        (game.scores[1] !== null && game.scores[1] !== undefined);

      if (hasScores) {
        const homeScore = Number(game.scores[0]) || 0;
        const awayScore = Number(game.scores[1]) || 0;
        const totalGoals = homeScore + awayScore;

        matchesStarted++;
        goalsTotal += totalGoals;
        goalsHome += homeScore;
        goalsAway += awayScore;

        // over 2.5
        if (totalGoals > 2.5) matchesOver2_5++;

        // partido más goleador
        if (totalGoals > topScoringGoals) {
          topScoringGoals = totalGoals;
          topScoringMatch = {
            home: game.teams && game.teams[0] ? game.teams[0].name : null,
            away: game.teams && game.teams[1] ? game.teams[1].name : null,
            score: `${homeScore}-${awayScore}`,
            goals: totalGoals,
            league: league.name,
          };
        }

        // contar scorelines
        const scoreline = `${homeScore}-${awayScore}`;
        scorelineCounts[scoreline] = (scorelineCounts[scoreline] || 0) + 1;

        // goles por competición
        goalsByCompetition[league.name] =
          (goalsByCompetition[league.name] || 0) + totalGoals;
      }

      // resultados: solo si winner es un número conocido
      if (typeof game.winner === "number") {
        if (game.winner === 1 && game.status.symbol_name === "Fin") homeWins++;
        else if (game.winner === 2 && game.status.symbol_name === "Fin") awayWins++;
        else if (game.winner === -1 && game.status.symbol_name === "Fin") draws++;
      }

      // tarjetas rojas (seguro con valor por defecto)
      (game.teams || []).forEach((t) => {
        redCards += Number(t.red_cards) || 0;
      });
    });
  });

  // liga más goleadora
  let topLeague = null;
  let topLeagueGoals = 0;
  for (const [leagueName, g] of Object.entries(goalsByCompetition)) {
    if (g > topLeagueGoals) {
      topLeagueGoals = g;
      topLeague = leagueName;
    }
  }

  // scoreline más frecuente
  let mostFrequentScoreline = null;
  let mostFrequentCount = 0;
  for (const [s, c] of Object.entries(scorelineCounts)) {
    if (c > mostFrequentCount) {
      mostFrequentCount = c;
      mostFrequentScoreline = s;
    }
  }

  return {
    competitions,
    matches, // partidos totales del día (programados / listados)
    matchesStarted, // partidos que ya tienen score
    homeWins,
    awayWins,
    draws,
    goalsTotal,
    goalsHome,
    goalsAway,
    redCards,
    matchesOver2_5,
    avgGoalsPerStartedMatch:
      matchesStarted > 0 ? Number((goalsTotal / matchesStarted).toFixed(2)) : 0,
    avgGoalsPerAllMatches:
      matches > 0 ? Number((goalsTotal / matches).toFixed(2)) : 0,
    topScoringMatch, // null si no hay partidos con score
    topLeague: topLeague ? { name: topLeague, goals: topLeagueGoals } : null,
    mostFrequentScoreline: mostFrequentScoreline
      ? { scoreline: mostFrequentScoreline, count: mostFrequentCount }
      : null,
  };
};


export const hasMatchesByStatus = (data, filter) => {
  if (filter === -1) return true; // no filtra, devuelve tal cual

  return (data.leagues || []).some((league) =>
    (league.games || []).some((game) => game.status?.enum === filter)
  );
};



export const getSortedArr = (leagues) => {

  let games = leagues.map(l => ({ games: l.games.map((x) => ({ ...x, league_name: l.name, league_id: l.id, country_id: l.country_id })) })).map(g => (g.games)).flat()
  let sorted = games.map(x => ({ ...x, "start_time_num": parseDateString(x.start_time) })).sort((a, b) => { return a.start_time_num - b.start_time_num })

  sorted = sorted.map((game, i) => ({
    ...game,
    league_id: (i - 1 < 0) ? game.league_id : (sorted[i - 1].league_id === sorted[i].league_id ? false : game.league_id),
    start_time_display: (i - 1 < 0) ? game.start_time : (sorted[i - 1].start_time === sorted[i].start_time ? false : game.start_time),
  }))

  

  return sorted

}