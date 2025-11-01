import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';


// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		preact({
			prerender: {
				enabled: true,
				renderTarget: '#app',
				additionalPrerenderRoutes: ['/404'],
				previewMiddlewareEnabled: true,
				previewMiddlewareFallback: '/404',
			},
		}),
		tailwindcss(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				
				name: 'Fútbol 1',
				short_name: 'Fútbol 1',
				start_url: '/',
				display: 'standalone',
				background_color: '#0e3e1d',
				theme_color: '#0e3e1d',
				icons: [
					{
						src: '/ball_64x64.png',
						sizes: '64x64',
						type: 'image/png',
					},
					{
						src: '/ball_128x128.png',
						sizes: '128x128',
						type: 'image/png',
					},
					{
						src: '/ball_256x256.png',
						sizes: '256x256',
						type: 'image/png',
					}
				]
			}
		})
	],
});
