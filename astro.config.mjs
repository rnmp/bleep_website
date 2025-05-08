import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
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