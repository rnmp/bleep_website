import { defineConfig } from 'astro/config';

export default defineConfig({
    site: 'https://bleep.is',
    output: 'static',
    build: {
        assets: 'assets'
    }
}); 