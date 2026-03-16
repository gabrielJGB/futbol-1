// import { useEffect } from "preact/hooks";
// import useSWR from "swr";
// import { fetcher } from '@/utils/fetcher'
// import { round } from "@/signals/league";
// import { Loading } from "@/components/common";
// import league from '@/data/dummy/LEAGUE_LIB.json'
// import games from '@/data/dummy/LEAGUE_GAMES.json'
// import {
//     LeagueInfo,
//     PlayerStats,
//     TablesAndFixtures,
//     Teams,
//     History,
//     Brackets,
//     TeamStats,
//     Table
// } from "@/components/league";



// const LeagueView = ({ leagueId }) => {


//     const { data: league, error: leagueError } = useSWR(
//         leagueId ? `https://api.promiedos.com.ar/league/tables_and_fixtures/${leagueId}` : null,
//         fetcher, {
//         revalidateOnFocus: false,
//         refreshInterval: 30000,
//     }
//     );




//     const { data: games, isLoading: gamesLoading, error: gamesError } = useSWR(
//         // @ts-ignore
//         leagueId && round.value?.key ? `https://api.promiedos.com.ar/league/games/${leagueId}/${round.value.key}` : null,
//         fetcher, {
//         revalidateOnMount: true,
//         revalidateOnFocus: false,
//         refreshInterval: 30000,
//     }
//     );


//     if (leagueError || gamesError) return <p>Error al cargar datos</p>;

//     if (!league) return (
//         <div class={"w-full md:col-start-2 mt-5 "}>
//             <Loading />
//         </div>
//     )



//     useEffect(() => {
//         if (league) {

//             document.title = league.league.name + " - Fútbol 1"

//             if (("games" in league)) {
//                 // @ts-ignore
//                 let x = league.games.filters.find(round => round.selected)

//                 if (x != undefined) {
//                     round.value = x
//                 } else {
//                     x = league.games?.filters.find(round => round.key === "latest")
//                     round.value = x
//                 }
//             }
//         }
//     }, [league])


//     const sections = [
//         {
//             "id": "section-4",
//             "name": "Llaves",
//             "component": (name, league, games) => (<Brackets league={league} />)
//         },

//         {
//             "id": "section-0",
//             "name": "Tablas y fixture",
//             "component": (name, league, games) => (<TablesAndFixtures name={name} league={league} games={games} gamesLoading={gamesLoading} />)
//         },
//         {
//             "id": "section-1",
//             "name": "Estadísticas de jugadores",
//             "component": (name, league, games) => (<PlayerStats league={league} />)
//         },
//         {
//             "id": "section-1",
//             "name": "Estadísticas de equipos",
//             "component": (name, league, games) => (<TeamStats id={leagueId} />)
//         },
//         {
//             "id": "section-3",
//             "name": "Campeones",
//             "component": (name, league, games) => (<History leagueId={leagueId} name={name} league={league} games={games} />)
//         },
//     ]


//     return (
//         <div class="bg-background/70 shadow-black shadow-lg border-x-[1px] border-borderc relative col-start-1 md:col-start-2  overflow-x-auto   text-white  font-sans  pb-20 md:mx-12">

//             <LeagueInfo league={league} />

//             <div class={"flex flex-col gap-3 md:px-6 px-1"}>
//                 {
//                     sections.map((section, i) => (

//                         <section
//                             // @ts-ignore
//                             // ref={(el) => (sectionRefs.current[`section-${i}`] = el)}
//                             class={"  "}
//                             id={`section-${i}`}
//                             key={i}
//                         >
//                             {section.component(section.name, league, games)}
//                         </section>
//                     ))

//                 }
//             </div>

//         </div>
//     );
// };

// export default LeagueView;
