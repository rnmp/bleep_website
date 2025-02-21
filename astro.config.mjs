import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
    site: 'https://bleep.is',
    output: 'static',
    build: {
        assets: 'assets'
    },
    integrations: [mdx()]
}); 