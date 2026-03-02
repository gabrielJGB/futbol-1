// @ts-nocheck
import { Link } from "preact-router/match";

export function NotFound() {
	return (
		<section class={"flex flex-col"}>
			<h1 class={"text-center text-3xl mt-5 font-semibold"}>Error 404: Página no encontrada</h1>
			<Link href="/" class={"italic hover:underline text-center  mt-6"}>Volver</Link>
		</section>
	);
}
