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
	




	return (
		<LocationProvider  >
			<div class={"from-[#0f2e22] to-[#1a6449] bg-gradient-to-br h-full px-10  min-h-screen "}>
				<Header />
				<Router>
					
					{/* <Route path="/layout" component={Layout} /> */}
					<Route path="/" component={RedirectToToday} />
					<Route path="/:date?" component={Home} />
					<Route path="/game/:id" component={Game} />
					<Route path="/league/:id" component={League} />
					<Route path="/team/:id" component={Team} />
					<Route path="/player/:name" component={Player} />
					<Route default component={NotFound} />
				</Router>
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
