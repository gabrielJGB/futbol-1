import { Link } from 'preact-router/match'
import React from 'react'


const getResultElement = (elem) => {

    if (elem === 0) {
        return <div class={" text-white bg-[#c20000] h-full px-[2px]"}>P</div>
    } else if (elem === 1)
        return <div class={" text-white bg-green-700 px-[2px]"}>G</div>
    else if (elem === 2)
        return <div class={" text-black bg-[#fae900] px-[2px]"}>E</div>

}


const getLiveColor = (status) => {

    if (status === 3) {
        return "yellow"
    } else if (status === 2) {
        return "red"
    } else if (status === 1) {
        return "lime"
    }

}

const Table = ({ table }) => {

    //bg-[#176115] 
    return (
        <div class={"flex flex-col gap-0 w-full md:overflow-x-hidden overflow-x-auto rounded-t  "}>
            <h2 class={"text-center  px-2 py-1 font-semibold "}
            >
                {table.name}
            </h2>
            <table class={"md:w-auto min-w-full bg-gray-500  border-separate border-spacing-[1px] "} >
                <thead>
                    <tr class="bg-black text-[#C2E213] uppercase  text-sm">
                        <th class="text-center">#</th>
                        <th class="w-[120px]">Equipo</th>
                        {
                            table.table.columns.map((col) => (

                                <th title={col.key} class="w-[25px] text-center text-xs">{col.title.replace("Gol","GF:GC").replace("+/-","Dif")}</th>
                            ))
                        }

                    </tr>
                </thead>

                <tbody>

                    {table.table.rows.map((row, i) => {
                        return (
                            <tr class={`text-black  text-sm border-b border-[#333] even:bg-[#E7E7E7] odd:bg-[#D5D5D5]`}>
                                <td style={{ background: ("destination_color" in row ? row.destination_color : ""), color: ("destination_color" in row ? "black" : "") }} class={"text-center w-[14px] px-1"}>{i + 1}</td>

                                <td class="font-semibold   gap-1 p-1">
                                    <Link
                                        // @ts-ignore
                                        href={`/team/${row.entity.object.id}`}
                                        class={"hover:underline w-max flex flex-row  items-center  gap-1"}
                                    >

                                        <img src={`https://api.promiedos.com.ar/images/team/${row.entity.object.id}/1`} style={{ height: 17 }} />

                                        <div class={"text-xs  line-clamp-1"}>{row.entity.object.short_name}</div>
                                        {
                                            "live_data" in row &&
                                            <div style={{ background: getLiveColor(row.live_data.status) }} class={`rounded-full w-[10px]  ml-1 animate-bounce     h-[10px] border-[1px] border-gray-800`}></div>
                                        }
                                    </Link>
                                </td>
                                {
                                    row.values.map((item, i) => {
                                        const key = table.table.columns[i].key
                                        const val = row.values.find(row => row.key === key)

                                        return (<td class={`${key === "Points" ? "font-semibold" : ""} text-center`}>
                                            {
                                                typeof (val.value) === 'object' ?
                                                    <div class={"flex text-xs font-semibold flex-row-reverse justify-center gap-[1px] px-1"}>
                                                        {
                                                            val.value?.map((elem, i) => (
                                                                getResultElement(elem)
                                                            ))
                                                        }
                                                    </div>
                                                    :
                                                    <div class={"px-2"}>{val.value}</div>
                                            }
                                        </td>)
                                    })
                                }
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {
                "destinations" in table.table &&
                <div class={"flex flex-col px-1"}>
                    {
                        table.table.destinations.map((item) => (
                            <div style={{ color: item.color }} class={" text-sm font-semibold text-shadow-sm text-shadow-black"}>{item.name}</div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Table