import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	optimizeDeps: {
		include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep']
	},
	plugins: [sveltekit()],
	server:{
		host:"0.0.0.0",
		port:3000,
	},
	preview:{
		port:3001
	}
	
});
