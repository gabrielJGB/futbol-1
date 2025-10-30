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


export const Home = ({ date }) => {


	const { data, loading } = useHome(date)
	// const loading = false

	const day = date.split("-")[0]
	const month = parseInt(date.split("-")[1]) - 1
	const year = date.split("-")[2]
	selectedDate.value = new Date(year, month, day)


	useEffect(() => {
		if (window.innerWidth < 768)
			showMenu.value = false

		document.title = "Fútbol 1"
		
	}, [])



	return (
		// 
		<div class={" grid md:grid-cols-[2fr_1fr] grid-cols-1 md:col-start-2 gap-15 md:px-15   pb-20 "}>

			<div class={"w-full md:mt-4 "}>
				<DateSelector />
				{loading ? <Loading /> : <LeagueList leagues={data.leagues} />}
			</div>

			<Calendar />

			{/* 
			<div class={` w-[350px]`}>

				{
					!loading && "calendar" in data &&
					<div class={"flex flex-col  p-1 mt-2"}>

						<div class={"mb-2 font-medium"}>{data.calendar.title.charAt(0).toUpperCase() + data.calendar.title.slice(1).toLowerCase()}:</div>
						{
							loading ?
								<div></div>
								:
								<div class={"flex flex-col gap-1"}>
									{
										data.calendar?.players?.map((player, i) => (
											<div class={"text-xs"}> - {player.name} ({player.team}) {player.text.replace("hoy", "")}</div>
										))
									}
										{
										// @ts-ignore
										data.calendar?.clubs?.map((club, i) => (
											<div class={"text-xs"}> - {club.name} {club.text.replace("hoy", "")}</div>
										))
									}
								</div>
						}

					</div>
				}
			</div> */}




		</div>
	);
}

