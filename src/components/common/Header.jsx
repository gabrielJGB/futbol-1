import { useLocation } from 'preact-iso';
import { Link } from 'preact-router/match';
import { showMenu, showCalendar, showNews } from '@/signals/home';
import { CalendarDaysIcon, MoonIcon, NewspaperIcon, SunIcon } from 'lucide-preact';
import fp_icon from '@/assets/futbolplay_icon.png'
import { darkMode } from '@/signals/common';
import { storage } from '@/utils/storage';

export default function Header() {
	const { path } = useLocation();
	const isHome = path.match(/\/\d+-\d+-\d+/) != null || path === "/" || path === "/hoy"


	return (
		<header class={"z-200 sticky top-0 p-1 bg-b2 border-borderc md:border-b-[1px]  h-[50px]  flex flex-row gap-1 items-center   "}>

			<div
				class={"md:hidden block px-3 py-1 mr-2 text-2xl text-[#C2E213] text-center active:bg-[#C2E213] active:text-green-900 hover:bg-[#C2E213] hover:text-green-900  font-semibold rounded  cursor-pointer"}
				onClick={() => { showMenu.value = !showMenu.value }}
			>&#9776;
			</div>

			<div class={"flex flex-row justify-between w-full items-center"}>
				<Link
					// @ts-ignore
					href="/" class={"font-bold text-shadow-xs text-shadow-gray-900 md:text-3xl text-2xl  md:pl-1 pl-0 cursor-pointer text-[#C2E213]  hover:text-[#e5ff51] active:text-[#e5ff51]"}>
					FUTBOL 1
				</Link>


				<div class={"flex items-center gap-1 "}>

					<a class={"flex items-center gap-2 hover:bg-b5/40 active:bg-b5/40 rounded-full p-2 md:rounded md:py-1 md:px-2 "} target="_blank" href={"https://futbolplay.vercel.app"} >
						<div class={"text-xs hidden md:block font-semibold"}>Fútbol Play</div>
						<img src={fp_icon} class={" md:size-8 size-6 cursor-pointer "} alt="Futbol Play Icon" />
					</a>


					{
						isHome &&
						<div
							class={`${showCalendar.value ? "bg-green-950 shadow-[0_0_5px_#032e15_inset]" : ""}  transition-all md:hidden max-lg:landscape:block block  hover:bg-b5/40 rounded-full active:bg-b5/40  p-2 cursor-pointer `}
							onClick={() => { showCalendar.value = !showCalendar.value }}
						>
							<CalendarDaysIcon size={22} color={"#C2E213"} />
						</div>
					}

					{
						isHome && 
						<div onClick={()=>{showNews.value = !showNews.value }} class={`${showNews.value ? "bg-green-950 shadow-[0_0_5px_#032e15_inset]" : ""}  md:hidden cursor-pointer hover:bg-b5/40 active:bg-b5/40 rounded-full p-2`}>
							<NewspaperIcon color={"#C2E213"} size={22} />
						</div>
					}

					<button
						class={" cursor-pointer hover:bg-b5/40 active:bg-b5/40 rounded-full p-2"}
						onClick={async () => {
							darkMode.value = !darkMode.value
							await storage.save('darkMode', darkMode.value );
						}}
					>
						{
							darkMode.value ?
								<SunIcon size={22} color='white' />
								:
								<MoonIcon size={22} color='white' />
						}
					</button>

				</div>

			</div>
		</header>
	);
}
