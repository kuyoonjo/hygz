import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	// server: {
	// 	// https: true as any,
	// 	host: true, // 局域网可访问
	// 	port: 6666,
	// },
});
