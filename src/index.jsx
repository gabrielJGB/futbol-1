import { useLocation, LocationProvider, Router, Route, hydrate, prerender as ssr } from 'preact-iso';

import { Header } from './components/Header.jsx';
import { Home } from './pages/Home/index.jsx';
import { NotFound } from './pages/_404.jsx';
import { Game } from './pages/Game/index.jsx';
import Team from './pages/Team/index.jsx';
import League from './pages/League/index.jsx';
import { useEffect } from 'preact/hooks';

import './style.css';
import Player from './pages/Player/index.jsx';
import Layout from './pages/Layout/index.jsx';
import Menu from './components/Menu.jsx';
import { showMenu } from './signals/signals.js';


const RedirectToToday = () => {
	const { route } = useLocation()
	useEffect(() => {
		const today = new Date();
		const formatted = today
			.toLocaleDateString("es-AR", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			})
			.replace(/\//g, "-");

		route(`/${formatted}`, true);
	}, []);

	return null;
};

export function App() {


// --color-1: #032E15;

/**puntos
 * 
 * "h-full  min-h-screen   border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_100%)] bg-[size:15px_15px] bg-background dark:[--pattern-fg:var(--color-white)]/40"
 * 
 */

/**
 * h-full  min-h-screen  bg-background col-start-2 row-span-5 row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 max-lg:hidden dark:[--pattern-fg:var(--color-white)]/10
 * 
 */
	return (
		<LocationProvider  >
			<div class={"h-full  min-h-screen  bg-zinc-950 col-start-2 row-span-5 row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_100%)] bg-[size:18px_18px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5  dark:[--pattern-fg:var(--color-white)]/40"}>
				<Header />
				<main class={` grid md:grid-cols-[250px_1fr] grid-cols-1 justify-between`}>
					<Menu />
					<Router>

						<Route path="/layout" component={Layout} />
						<Route path="/" component={RedirectToToday} />
						<Route path="/:date?" component={Home} />
						<Route path="/game/:id" component={Game} />
						<Route path="/league/:id" component={League} />
						<Route path="/team/:id" component={Team} />
						<Route path="/player/:name" component={Player} />
						<Route default component={NotFound} />
					</Router>
				</main>
			</div>
		</LocationProvider>
	);
}

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
