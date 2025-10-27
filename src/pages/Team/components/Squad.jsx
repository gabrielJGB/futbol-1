import { Link } from "preact-router";

export const Squad = ({ squad }) => {
    if (!squad?.groups?.length) return null;

    return (
        <div class="">
            <h3 class="text-2xl font-semibold mb-3 text-primary">Plantel</h3>
            <div class={"grid md:grid-cols-2 grid-cols-1 gap-4"}>
                {squad.groups.map((group) => (
                    <div key={group.name} class="shadow-xs shadow-black bg bg-gray-800  rounded-2xl  p-3">
                        <h4 class="font-semibold text-lg text-blue-400 mb-2 border-l-4 pl-2 border-blue-700">
                            {group.name.replace("Dirección", "Dirección Técnica")}
                        </h4>
                        <table class="w-full text-sm border-collapse">
                            <thead>
                                <tr class="bg-gray-900 text-white font-semibold">
                                    {squad.columns.map((col) => (
                                        <th key={col.key} class="pl-2 text-left py-1">
                                            {col.name.replace("Jugadores", "Nombre").replace("EDAD", "Edad")}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {group.rows.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        class="not-last:border-b odd:bg-gray-700/30 py-[2px] even:bg-gray-700/70  border-gray-800 hover:bg-gray-600 cursor-pointer transition"
                                    >
                                        {row.values.map((v, i) => (
                                            <td key={v.key} class=" first:text-left text-center cursor-pointer">
                                                <Link
                                                    // @ts-ignore
                                                    href={`/player/${row.entity.object.name}`}

                                                >
                                                    {i === 0 ?

                                                        <div class={"flex flex-row items-center gap-2 py-2"}>
                                                            <img src={`https://api.promiedos.com.ar/images/country/${row.entity.object.country_id}/1`} alt="Logo" className="h-5 w-5 mx-1" />
                                                            <span>{v.value}</span>
                                                        </div>
                                                        :
                                                        <span>{v.value}</span>
                                                    }
                                                </Link>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};
