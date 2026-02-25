import { useEffect, useState } from "preact/hooks";
import { selectedDate, showMenu } from "../../signals/home";
import { useHome } from "@/hooks/useHome";
import data from '@/data/dummy/TODAY.json'

import {
	Calendar,
	Menu,
	DateSelector,
	Header,
	Loading,
	SectionTitle
} from '@/components/common'

import {
	Anniversaries,
	DateString,
	LeaguesContainer
} from '@/components/home'


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
	// 	return (<div class={"text-red-700 font-semibold text-center w-full"}>Ha ocurrido un error</div>)


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
					<LeaguesContainer leagues={data.leagues} />
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

