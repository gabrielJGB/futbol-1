import React from 'react'
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { Loading } from '@/components/common';
import { Link } from 'preact-router';

const getResultElement = (elem) => {

    if (elem === 0) {
        return <div class={" text-white bg-[#c20000] px-[2px] rounded-xs"}>P</div>
    } else if (elem === 1)
        return <div class={" text-white bg-green-700 px-[2px] rounded-xs"}>G</div>
    else if (elem === 2)
        return <div class={" text-black bg-[#fac500] px-[2px] rounded-xs"}>E</div>

}

const Table = ({ table }) => {

    console.log(table);

    return (
        <div>
            <h2 class={"w-full  px-3 shadow shadow-gray-900 bg-[#176115]  font-semibold text-white text-start rounded-t-sm"}>{table.name}</h2>
            <table class={"w-full  bg-gray-500   border-separate border-spacing-[1px] "} >
                <thead>
                    <tr class="bg-black text-[#C2E213] uppercase  text-sm">
                        <th class="text-center">#</th>
                        <th class="w-[120px]">Equipo</th>
                        {
                            table.columns.filter(c => c.key != "{trend}").map((col) => (

                                <th title={col.key} class="w-[25px] text-center text-xs">{col.title}</th>
                            ))
                        }

                    </tr>
                </thead>

                <tbody>

                    {table.rows.map((row, i) => {
                        return (
                            <tr class={`text-black text-sm border-b border-[#333] even:bg-[#E7E7E7] odd:bg-[#D5D5D5]`}>
                                <td style={{ background: ("destination_color" in row ? row.destination_color : ""), color: ("destination_color" in row ? "black" : "") }} class={"text-center hover:text-white w-[20px]"}>{i + 1}</td>

                                <td class="font-semibold   gap-1 p-[3px]">
                                    <Link
                                        // @ts-ignore
                                        href={`/team/${row.entity.object.id}`}
                                        class={"hover:underline flex flex-row  items-center  gap-0"}
                                    >
                                        <div class={"w-[18px]"}>
                                            <img src={`https://api.promiedos.com.ar/images/team/${row.entity.object.id}/1`} style={{ height: 17 }} />
                                        </div>
                                        <div class={"text-xs"}>{row.entity.object.short_name}</div>

                                    </Link>
                                </td>
                                {
                                    row.values.filter(c=>c.key!="{trend}").map((item, i) => {
                                        const key = table.columns[i].key
                                        const val = row.values.find(row => row.key === key)

                                        return (
                                            <td class={`${key === "Points" ? "font-semibold" : ""} text-center`}>
                                                <div class={"px-1"}>{val.value}</div>
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {
                "destinations" in table &&
                <div class={"flex flex-col"}>
                    {
                        table.destinations.map((item) => (
                            <div style={{ color: item.color }} class={" text-sm font-semibold text-shadow-sm text-shadow-black"}>{item.name}</div>
                        ))
                    }
                </div>
            }
        </div>
    )
}


const TablePage = ({ id }) => {

    const leagueId = id.split("-")[0]
    const seasonId = id.split("-")[1]
    const leagueSeasonName = id.split("-")[2]

    const { data, error, isLoading } = useSWR(
        leagueId ? `https://api.promiedos.com.ar/league/history/tables/${leagueId}/${seasonId}` : null,
        fetcher, {
        revalidateOnFocus: false,
    }
    );



    if (isLoading)
        return <div class={"col-start-1 md:col-start-2 w-full"}>
            <Loading />
        </div>

    if (error)
        return <div></div>



    const leagueCountry = data.league.name
    const tablesGroups = data.tables_groups


    return (
        <div class={"col-start-1 md:col-start-2  flex flex-col gap-2 w-full mb-20"}>
            <div class={"flex md:flex-row flex-col justify-center items-center gap-1 md:gap-2 py-1"}>
                <div class={"text-center text-lg   font-semibold text-primary"}>{leagueCountry}</div>
                <div class={"text-center text-lg  font-semibold text-primary"}>{leagueSeasonName.replaceAll("_", "/")}</div>
            </div>

            <div class={"flex flex-col gap-4 md:mx-10 mx-1"}>
                {
                    tablesGroups.map((group) => (
                        <div class={"grid md:grid-cols-2 grid-cols-1 gap-10"}>


                            {
                                group.tables.map((table) => (
                                    <div>
                                        <div class={"bg-[#176115] font-semibold text-center"}>{table.name}</div>
                                        <Table table={table.table} />
                                    </div>
                                ))
                            }

                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default TablePage