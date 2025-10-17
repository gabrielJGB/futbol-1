import React from 'react'


const getResultElement = (elem) => {

    if (elem === 0) {
        return <div class={" text-white px-[2px] bg-red-800 "}>P</div>
    } else if (elem === 1)
        return <div class={" text-white px-[2px] bg-green-700 "}>G</div>
    else if (elem === 2)
        return <div class={" text-black px-[2px] bg-yellow-400 "}>E</div>

}


const getLiveColor = (status)=>{

    if(status === 3){
        return "yellow"
    }else if(status === 2){
        return "red"
    }else if(status === 1){
        return "lime"
    }

}

const Table = ({ table }) => {


    return (
        <div>
            <h2 class={"w-full py-[2px] bg-[#176115] text-sm font-semibold text-white text-center"}>{table.name}</h2>
            <table class={"w-full shadow shadow-gray-900 bg-gray-500   border-separate border-spacing-[2px] rounded"} >
                <thead>
                    <tr class="bg-black text-[#C2E213] uppercase  text-sm">
                        <th class="text-center">#</th>
                        <th class="w-[120px]">Equipo</th>
                        {
                            table.table.columns.map((col) => (

                                <th title={col.key} class="w-[25px] text-center text-xs">{col.title}</th>
                            ))
                        }

                    </tr>
                </thead>

                <tbody>

                    {table.table.rows.map((row, i) => {
                        return (
                            <tr class={`text-black text-sm border-b border-[#333] ${i % 2 === 0 ? "bg-[#E7E7E7]" : "bg-[#D5D5D5]"}`}>
                                <td style={{ background: ("destination_color" in row ? row.destination_color : "") }} class={"text-center w-[10px]"}>{i + 1}</td>

                                <td class="font-semibold  flex flex-row  items-center gap-1 p-[3px]">
                                    <div class={"w-[18px]"}>
                                    <img src={`https://api.promiedos.com.ar/images/team/${row.entity.object.id}/1`} style={{height:17}} />
                                    </div>
                                    <div class={"text-xs"}>{row.entity.object.short_name}</div>
                                    {
                                        "live_data" in row &&
                                        <div style={{background:getLiveColor(row.live_data.status)}} class={`rounded-full w-[10px]  ml-1 animate-bounce    h-[10px] border-[1px] border-gray-800`}></div>
                                    }
                                </td>
                                {
                                    row.values.map((item, i) => {
                                        const key = table.table.columns[i].key
                                        const val = row.values.find(row => row.key === key)

                                        return (<td class={`${key === "Points" ? "font-semibold" : ""} text-center`}>
                                            {
                                                typeof (val.value) === 'object' ?
                                                    <div class={"flex text-xs font-semibold flex-row-reverse justify-center gap-[1px] flex-1"}>
                                                        {
                                                            val.value?.map((elem, i) => (
                                                                getResultElement(elem)
                                                            ))
                                                        }
                                                    </div>
                                                    :
                                                    <div>{val.value}</div>
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
                <div class={"flex flex-col"}>
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