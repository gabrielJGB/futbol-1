// @ts-nocheck
import { Link } from "preact-router";

export const Games = ({ games }) => {
    if (!games) {
        return null;
    }

    const { next, last } = games;

    // console.log(games);


    const renderGameRow = (game, isResult = false) => {
        const opponent = game.entity?.object?.short_name || 'S/D';
        const id = game.entity?.object?.id || null;
        const date = game.values?.find(v => v.key === 'date')?.value;
        const homeAway = game.values?.find(v => v.key === 'home_away')?.value;

        let resultSpecificContent;
        if (isResult) {
            const result = game.values?.find(v => v.key === 'result')?.value;
            let bgColor = 'bg-transparent text-white'; // Empate por defecto
            if (game.result_status === 1) bgColor = 'bg-green-700 text-green-100'; // Victoria
            if (game.result_status === 2) bgColor = 'bg-red-700 text-red-100'; // Derrota
            if (game.result_status === 3 && game.game.status.symbol_name === "Fin") bgColor = 'bg-yellow-300 text-black'; // Derrota

            resultSpecificContent = <td class={`px-4 py-1 font-mono text-center font-semibold ${bgColor}`}><Link href={`/game/${game.game?.id}`}>{result}</Link></td>;
        } else {
            const time = game.values?.find(v => v.key === 'time')?.value;
            resultSpecificContent = <td class="px-4 py-1 font-mono text-gray-200 text-center"><Link href={`/game/${game.game?.id}`}>{time}</Link></td>;
        }

        return (
            <tr key={game.game?.id || opponent + date} class="odd:bg-gray-700/30 even:bg-gray-700/70 cursor-pointer transition-all not-last:border-b border-gray-800 hover:bg-gray-600">
                <td class="px-4 py-0 text-center">
                    <Link href={`/game/${game.game?.id}`}>
                        {date}
                    </Link>
                </td>

                <td class="px-4 py-0 text-center">
                    <Link href={`/game/${game.game?.id}`}>
                        {homeAway}
                    </Link>
                </td>

                <td class="px-4 py-1">
                    <Link class={"flex flex-row items-center gap-2"}  href={`/game/${game.game?.id}`}>
                        <img src={`https://api.promiedos.com.ar/images/team/${id}/1`} alt="Escudo Equipo" className="w-6 h-6 object-contain" />
                        <span>{opponent}</span>

                    </Link>
                </td>
                {resultSpecificContent}
            </tr>
        );
    };

    return (
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8  ">

            {/* Últimos Resultados */}
            {last && last.rows && (
                <div class="bg-gray-800 p-2 rounded-lg shadow-lg h-min">
                    <h3 class="text-2xl font-bold px-2 pb-2 text-primary">Últimos partidos</h3>
                    <div class="overflow-x-auto">

                        <table class="w-full text-sm">
                            <thead>
                                <tr class="bg-gray-100 text-left text-gray-600 uppercase">
                                    {last.columns.map(col => <th class="px-4 py-2" key={col.key}>{col.name}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {last.rows.map(row => renderGameRow(row, true))}
                            </tbody>
                        </table>

                    </div>
                </div>
            )}


            {/* Próximos Partidos */}
            {next && next.rows && (
                <div class="bg-gray-800 p-2 rounded-lg shadow-lg h-min">
                    <h3 class="text-2xl font-bold px-2 pb-2 text-primary">Próximos partidos</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="bg-gray-100 text-left text-gray-600 uppercase">
                                    {next.columns.map(col => <th class="px-4 py-2" key={col.key}>{col.name}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {next.rows.map(row => renderGameRow(row, false))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}


        </div>



    );
};

