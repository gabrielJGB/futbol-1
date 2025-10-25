// @ts-nocheck
import { useLocation } from 'preact-iso';
import { Link } from 'preact-router/match';
import { showMenu, showCalendar } from '../signals/signals';
import { CalendarDaysIcon } from 'lucide-preact';

export function Header() {
	const { path } = useLocation();
	const isHome = path.match(/\/\d+-\d+-\d+/) != null || path === "/"

	return (
		<header class={"z-200 sticky top-0 p-1 bg-b2 border-borderc md:border-b-[1px]  h-[7vh]  flex flex-row gap-1 items-center   "}>

			<div
				class={"md:hidden block px-3 py-1 mr-2 text-2xl text-[#C2E213] text-center active:bg-[#C2E213] active:text-green-900 hover:bg-[#C2E213] hover:text-green-900  font-semibold rounded  cursor-pointer"}
				onClick={() => { showMenu.value = !showMenu.value }}
			>&#9776;
			</div>

			<div class={"flex flex-row justify-between w-full items-center"}>
				<Link href="/" class={"font-bold text-shadow-xs text-shadow-gray-900 text-[32px] md:pl-1 pl-0 cursor-pointer text-[#C2E213]  hover:text-[#e5ff51]"}>
					FUTBOL 1
				</Link>

				{
					isHome &&
					<div
						class={"md:hidden active:bg-green-950 rounded p-2 cursor-pointer"}
						onClick={() => { showCalendar.value = !showCalendar.value }}
					>
						<CalendarDaysIcon size={20} color={"#C2E213"} />
					</div>
				}


			</div>
		</header>
	);
}
