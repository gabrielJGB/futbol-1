import { useEffect, useState } from "preact/hooks";
import { selectedDate, showCalendar, showMenu } from "../../signals/home";
import { useHome } from "@/hooks/useHome";
import { getDateObject } from "@/utils/time";
import { sortByDate } from "@/signals/home"
import data from '@/data/dummy/TODAY.json'

import {
	Calendar,
	Menu,
	DateSelector,
	Header,
	Loading,
	SectionTitle,
	Error
} from '@/components/common'

import {
	CalendarEvents,
	DateString,
	LeaguesContainer,
	DailyStats,
	FilterButtons,
	SortedGames
} from '@/components/home'
import { route } from "preact-router";
import HomeNews from "@/components/common/HomeNews";


export const Home = ({ date }) => {

	const { error } = useHome(date)
	selectedDate.value = getDateObject(date)


	useEffect(() => {
		document.title = "Fútbol 1"
		if (window.innerWidth < 768)
			showMenu.value = false
	}, [])


	// if (loading)
	// 	return (
	// 		<div class={"grid md:grid-cols-[2fr_1fr] grid-cols-1 md:col-start-2 gap-15 md:px-15   pb-20 "}>
	// 			<Loading />
	// 		</div>
	// 	)

	if (error)
		return <Error />


	return (

		<div class={" grid md:grid-cols-[2fr_1fr] max-lg:landscape:grid-cols-1 grid-cols-1 md:col-start-2 max-lg:landscape:gap-0 gap-15 max-lg:landscape:px-5 md:px-15  md:gap-15 pb-20 "}>

			<div class={"w-full landscape:mt-0  md:mt-4 col-start-1 md:pt-5"}>

				<DateSelector />

				<div class={"flex flex-col gap-2 w-full   px-1  md:bg-background md:border-[1px] border-borderc "}>

					<DateString />
					<DailyStats date={date} />
					<FilterButtons date={date} />
					<LeaguesContainer date={date} />

				</div>

			</div>

			<div class={`${showCalendar.value ? "md:static -right-[0%] backdrop-blur-xs " : "md:static -right-[100%] backdrop-blur-none "} bg-black/50 transition-all flex  flex-col items-center justify-center md:relative max-lg:landscape:fixed fixed h-[100vh]  w-full md:flex-none  md:bg-transparent  pt-18 md:pt-5 md:h-max  md:rounded-lg z-100 `}>

				<Calendar date={date} />

				{
					false && date != "hoy" &&
					<div
						class={"bg-transparent text-shadow-xs h-full text-shadow-black cursor-pointer text-sm text-center w- hover:underline"}
						onClick={() => {
							showCalendar.value = false
							selectedDate.value = new Date()
							route("/hoy")
						}}
					>Volver a hoy</div>
				}

				<HomeNews date={date} />

			</div>
		</div>
	);
}

