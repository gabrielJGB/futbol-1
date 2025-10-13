// @ts-nocheck
import { useLocation } from 'preact-iso';
import { Link } from 'preact-router/match';
import { showMenu } from '../signals/signals';

export function Header() {
	const { url } = useLocation();

	return (
		<header class={"flex flex-row items-center px-1 md:px-0 md:pb-6 pt-2 pb-1"}>

			<div
				class={"md:hidden px-2 py-1 mr-1 text-3xl text-[#C2E213] text-center hover:bg-[#C2E213] hover:text-green-900  font-semibold rounded-md shadow shadow-gray-800 cursor-pointer"}
				onClick={() => { showMenu.value = !showMenu.value }}
			>&#9776;
			</div>

			<Link href="/" class={"font-bold text-shadow text-shadow-gray-900 text-3xl cursor-pointer text-[#C2E213]  hover:text-[#e5ff51]"}>
				FUTBOL 1
			</Link>
		</header>
	);
}
