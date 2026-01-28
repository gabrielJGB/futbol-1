import { useEffect, useState } from "preact/hooks";
import Calendar from "../../components/Calendar";
import Menu from "../../components/Menu";
import LeagueList from "./components/LeagueList";
import DateSelector from "../../components/DateSelector";
import { selectedDate, showMenu } from "../../signals/signals";
import { useLocation } from "preact-iso";
import { useHome } from "./useHome";
import data from '../../../TODAY.json'
import Loading from "../../components/Loading";
import Anniversaries from "./components/Anniversaries";
import DateString from "./components/DateString";


export const Home = ({ date }) => {


	const { data, loading, error } = useHome(date)
	let dateObj = new Date()

	if (date != "hoy") {

		const day = date.split("-")[0]
		const month = parseInt(date.split("-")[1]) - 1
		const year = date.split("-")[2]
		dateObj = new Date(year, month, day)
	}
	selectedDate.value = dateObj


	useEffect(() => {
		document.title = "Fútbol 1"
		if (window.innerWidth < 768)
			showMenu.value = false
	}, [])



	// if (error)
	// 	return (
	// 		<div>
	// 			Error: {error.message}
	// 		</div>
	// 	)


	// if ( Object.keys(data).length === 0)
	// 	return (
	// 		<div class={"text-center w-full mt-10"}>
	// 			Sin datos
	// 		</div>
	// 	)

	// useEffect(() => {

	// 	console.log(data)

	// }, [data])


	return (

		<div class={" grid md:grid-cols-[2fr_1fr] grid-cols-1 md:col-start-2 gap-15 md:px-15   pb-20 "}>

			<div class={"w-full  md:mt-4 col-start-1"}>
				<DateSelector />

				{loading && <Loading />}

				{
					!loading &&
					<DateString dateObj={dateObj} />
				}

				{
					!loading && data != undefined && Object.keys(data).length != 0 &&
					<LeagueList leagues={data.leagues} />
				}

				{
					data != undefined && "leagues" in data && data.leagues.length === 0 &&
					<div class={"text-center w-full mt-10 text-lg font-semibold"}>Sin partidos</div>
				}

			</div>
			<Calendar />
			<Anniversaries data={data} loading={loading} />
		</div>
	);
}

