import { h } from 'preact';


const Game = ({ match }) => {
    const formatDate = (iso) => {
        const date = new Date(iso);
        return date.toLocaleString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        }).replace(',', 'hs');
    };

    const totalHome = match.firstLeg.home + match.secondLeg.away;
    const totalAway = match.firstLeg.away + match.secondLeg.home;
    const winner = totalHome > totalAway ? 'home' : totalAway > totalHome ? 'away' : 'draw';

    const getTeamClass = (team) =>
        winner === team ? 'font-bold text-white bg-green-600 rounded px-1' : 'opacity-80';

    return (
        <div class="flex flex-col bg-neutral-900 text-white text-sm rounded-xl p-3 shadow-md w-fit min-w-[240px] gap-2">
            <div class="flex justify-between text-xs text-neutral-400">
                <span>{formatDate(match.date)}</span>
                <span>Ida / Vuelta</span>
            </div>

            {/* Equipos */}
            <div class="flex flex-col gap-1">
                {/* Local */}
                <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                        <img src={match.home.logo} alt={match.home.name} class="w-5 h-5 rounded-full" />
                        <span class={getTeamClass('home')}>{match.home.name}</span>
                    </div>
                    <div class="flex gap-2 text-right">
                        <span>{match.firstLeg.home}-{match.secondLeg.home}</span>
                    </div>
                </div>

                {/* Visitante */}
                <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                        <img src={match.away.logo} alt={match.away.name} class="w-5 h-5 rounded-full" />
                        <span class={getTeamClass('away')}>{match.away.name}</span>
                    </div>
                    <div class="flex gap-2 text-right">
                        <span>{match.firstLeg.away}-{match.secondLeg.away}</span>
                    </div>
                </div>
            </div>

            {/* Resultado global */}
            <div class="flex justify-center text-xs text-neutral-400 mt-1">
                Global: {totalHome} - {totalAway}
            </div>
        </div>
    );
};




const index = () => {
    return (
        <div>
            <Game
                match={{
                    home: { name: 'Boca Juniors', logo: '/boca.png' },
                    away: { name: 'River Plate', logo: '/river.png' },
                    firstLeg: { home: 1, away: 0 },
                    secondLeg: { home: 0, away: 1 },
                    date: '2025-10-15T15:00:00Z',
                }}
            />
        </div>
    )
}

export default index