import React from 'react'

const Positions = ({ game }) => {

    const standings = game.standings


    return (
        <div class={"flex justify-center items-center flex-col gap-1 rounded "}>
            <div class={"w-full text-lg font-semibold text-[#C2E213] text-shadow-xs text-shadow-black  text-center "}>
                {standings.title}
            </div>

            <table class={"shadow shadow-gray-900 bg-gray-500 w-full md:w-1/2 border-separate border-spacing-[2px]"} >
                <thead>
                    <tr class={"text-[14px]"}>
                        <th class={"bg-black text-white"}>#</th>
                        <th class={"bg-black text-white"}>Equipo</th>
                        {
                            standings.columns.map((col) => (
                                <th class={"bg-black text-white"}>{col.display_name}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        standings.rows.map((row, i) => (
                            <tr >
                                <td class={"bg-gray-300 font-semibold text-center text-black px-1"}>
                                    {row.num}
                                </td>
                                <td class={"flex flex-row items-center gap-1 bg-gray-300 text-black"}>
                                    <img
                                        src={`https://api.promiedos.com.ar/images/team/${row.entity.object.id}/1`}
                                        className="h-4 object-contain"
                                        alt="Escudo Equipo"
                                    />
                                    <div class={""}>{row.entity.object.name}</div>
                                </td>
                                {
                                    row.values.map((item) => (
                                        <td class={"bg-gray-300 text-black text-center"}>{item.value}</td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>



        </div>
    )
}

export default Positions