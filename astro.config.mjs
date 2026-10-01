import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// Preview deploys set BASE_PATH to /pr-preview/pr-<number>. Production leaves it unset.
const base = process.env.BASE_PATH?.replace(/\/$/, '') || '';
if (base && !/^\/pr-preview\/pr-\d+$/.test(base)) {
    throw new Error(
        `BASE_PATH must look like /pr-preview/pr-123 (received ${process.env.BASE_PATH})`
    );
}

export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    site: 'https://bleep.is',
    ...(base ? { base } : {}),
    output: 'static',
    build: {
        assets: 'assets'
    },
    integrations: [mdx()],
    redirects: {
        '/support': '/guides',
        '/support/extensions/safari': '/support/extensions/#install-on-safari',
        '/support/extensions/chrome': 'https://chromewebstore.google.com/detail/bleep-quick-save/cjfkfilhmpodcciidnmoiojffkmkgepj'
    }
});
