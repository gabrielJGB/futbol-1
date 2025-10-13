import { useEffect, useState } from "preact/hooks";
import Calendar from "../../components/Calendar";
import Menu from "../../components/Menu";
import LeagueList from "./components/LeagueList";
import DateSelector from "../../components/DateSelector";
import { selectedDate, showMenu } from "../../signals/signals";
import { useLocation } from "preact-iso";
import { useHome } from "./useHome";
import data from '../../../TODAY.json'


export const Home = ({ date }) => {

	const [menuVisible, setMenuVisible] = useState(false)
	const [calendarVisible, setCalendarVisible] = useState(false)
	const { data, loading } = useHome(date)
	// const loading = false
	const { route } = useLocation()
	const day = date.split("-")[0]
	const month = parseInt(date.split("-")[1])-1
	const year = date.split("-")[2]
	selectedDate.value = new Date(year,month,day)

	

	return (
		<div class={"z-10 relative grid md:grid-cols-[1fr_2fr_1fr] grid-cols-1 md:gap-20 "}>

			<div class={`z-20 bg-[rgba(0,0,0,0.9)] md:h-max md:static   md:-left-auto  fixed  w-full   top-0 ${showMenu.value ? "-left-[0%]" : "-left-[100%]"} transition-all`}>
				<Menu />
			</div>

			<div class={"md:m-0 mx-1 mb-20"}>
				<DateSelector />
				{
					loading ?
						<div class={"flex-1 w-full h-screen rounded-xs bg-[#002D29] shadow shadow-black"}></div>
						:
						// <div></div>
						<LeagueList leagues={data.leagues} />
				}
			</div>

			<div class={`z-20 flex flex-col md:pt-0 pt-20 md:items-start items-center md:bg-transparent bg-[rgba(0,0,0,0.95)]  md:static   md:-right-auto  fixed md:w-auto w-full h-screen top-0 ${calendarVisible ? "-right-[0%]" : "-right-[100%]"} transition-all`}>
				<Calendar />

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
			</div>


			<div class={"z-30 flex flex-row justify-between w-full md:hidden fixed bottom-0"}>
				<div></div>
				<div class={"p-2 text-sm w-[110px] bg-[#008000] text-white text-center hover:bg-[#1da51d]  font-semibold rounded-tl-md shadow shadow-gray-800 cursor-pointer"} onClick={() => setCalendarVisible(!calendarVisible)}>Calendario</div>
			</div>


		</div>
	);
}

