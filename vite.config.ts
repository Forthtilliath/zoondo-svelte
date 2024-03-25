import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import webSocketServer from './src/lib/server/websocket';

export default defineConfig({
  plugins: [sveltekit(), webSocketServer]
});
