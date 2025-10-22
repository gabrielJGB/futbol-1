// @ts-nocheck
import { useLocation } from 'preact-iso';
import { Link } from 'preact-router/match';
import { showMenu } from '../signals/signals';

export function Header() {
	const { url } = useLocation();

	return (
		<header class={"sticky top-0 z-[200] p-1 bg-[#032E15] h-[7vh]  flex flex-row gap-1 items-center   "}>

			<div
				class={"block px-3 py-1 mr-2 text-2xl text-[#C2E213] text-center active:bg-[#C2E213] active:text-green-900 hover:bg-[#C2E213] hover:text-green-900  font-semibold rounded  cursor-pointer"}
				onClick={() => { showMenu.value = !showMenu.value }}
			>&#9776;
			</div>

			<Link href="/" class={"font-bold text-shadow text-shadow-gray-900 text-3xl cursor-pointer text-[#C2E213]  hover:text-[#e5ff51]"}>
				FUTBOL 1
			</Link>
		</header>
	);
}
