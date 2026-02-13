import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    site: 'https://bleep.is',
    output: 'static',
    build: {
        assets: 'assets'
    },
    integrations: [mdx()],
    redirects: {
        '/support/extensions/safari': '/support/extensions/#install-on-safari',
        '/support/extensions/chrome': 'https://chromewebstore.google.com/detail/bleep-quick-save/cjfkfilhmpodcciidnmoiojffkmkgepj'
    }
}); 