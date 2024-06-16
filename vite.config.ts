import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
	optimizeDeps: {
		esbuildOptions: {
			// Node.js global to browser globalThis
			define: {
				global: 'globalThis' //<-- AWS SDK
			}
		}
	},
	plugins: [sveltekit()],
	define: {
		'process.env': { ...process.env },
	}
});
