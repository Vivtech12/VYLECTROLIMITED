import { defineConfig, fontProviders } from "astro/config";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

import tailwindcss from '@tailwindcss/vite'
// https://astro.build/config
export default defineConfig({
	vite :{
		plugins: [
			tailwindcss(),
		  ],
	},
	site: "https://vylectrolimited.co.uk",
	integrations: [icon(), sitemap()],
	experimental: {
		fonts: [
			{
				provider: fontProviders.google(),
				name: "Roboto Mono",
				cssVariable: "--font-roboto-mono",
				weights: [400, 500, 600, 700],
				styles: ["normal"],
				subsets: ["latin"],
				fallbacks: ["monospace"]
			},
			{
				provider: fontProviders.google(),
				name: "Roboto",
				cssVariable: "--font-roboto",
				weights: [400, 500, 600, 700],
				styles: ["normal"],
				subsets: ["latin"],
				fallbacks: ["sans-serif"]
			}
		]
	}
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           