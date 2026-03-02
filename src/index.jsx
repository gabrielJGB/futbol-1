import './style.css';
import { useLocation, LocationProvider, Router, Route, hydrate, prerender as ssr } from 'preact-iso';
import { useEffect } from 'preact/hooks';

import { Home } from './pages/Home/index.jsx';
import { NotFound } from './pages/_404.jsx';
import { Game } from './pages/Game/index.jsx';
import Team from './pages/Team/index.jsx';
import League from './pages/League/index.jsx';
import Player from './pages/Player/index.jsx';
import ArticlePage from './pages/Article/index.jsx';
import TablePage from './pages/Table/index.jsx';
import { Menu,Header } from '@/components/common'
import Testpage from '@/pages/TestPage';


const RedirectToToday = () => {

	const { route } = useLocation()
	useEffect(() => { route("/hoy", true) }, [])
	return null

}

export function App() {

	return (
		<LocationProvider  >
			<div class={"bg-[url('/bg.png')]  h-full  min-h-screen   col-start-2 row-span-5 row-start-1 bg-[#010e06]"}>
				<Header />
				<main class={` grid md:grid-cols-[250px_1fr] grid-cols-1 justify-between`}>
					<Menu />
					<Router>

						<Route path="/" component={RedirectToToday} />
						<Route path="/:date?" component={Home} />
						<Route path="/game/:id" component={Game} />
						<Route path="/league/:id" component={League} />
						<Route path="/team/:id" component={Team} />
						<Route path="/player/:name" component={Player} />
						<Route path="/article/:id" component={ArticlePage} />
						<Route path="/table/:id" component={TablePage} />

						<Route path="/testpage/:id" component={Testpage} />
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
