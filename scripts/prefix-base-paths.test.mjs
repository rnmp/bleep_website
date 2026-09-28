import assert from "node:assert/strict";
import test from "node:test";
import { rewritePreviewContent } from "./prefix-base-paths.mjs";

const base = "/pr-preview/pr-99";

test("prefixes hardcoded site links and public assets", () => {
    const input = `
        <a href="/">Home</a>
        <a href="/#features">Features</a>
        <a href="/support">Support</a>
        <img src="/assets/app_icon@2x.png">
        <source srcset="/assets/hero_devices_dark.png" media="(prefers-color-scheme: dark)">
        <video src="/why/bleep.mp4#t=0.001"></video>
        <link rel="icon" href="/favicon.png">
    `;
    const output = rewritePreviewContent(input, base);
    assert.match(output, /href="\/pr-preview\/pr-99\/"/);
    assert.match(output, /href="\/pr-preview\/pr-99\/#features"/);
    assert.match(output, /href="\/pr-preview\/pr-99\/support"/);
    assert.match(output, /src="\/pr-preview\/pr-99\/assets\/app_icon@2x.png"/);
    assert.match(output, /srcset="\/pr-preview\/pr-99\/assets\/hero_devices_dark.png"/);
    assert.match(output, /src="\/pr-preview\/pr-99\/why\/bleep.mp4#t=0.001"/);
    assert.match(output, /href="\/pr-preview\/pr-99\/favicon.png"/);
});

test("does not double-prefix URLs Astro already rewrote", () => {
    const input = `
        <link rel="stylesheet" href="/pr-preview/pr-99/assets/why.css">
        <a href="/pr-preview/pr-99/support/notes">Notes</a>
        <style>background:url(/pr-preview/pr-99/fonts/Manrope-Regular.woff2)</style>
    `;
    const output = rewritePreviewContent(input, base);
    assert.equal(output, input);
});

test("leaves external, hash, and mailto URLs unchanged", () => {
    const input = `
        <a href="https://apps.apple.com/app/bleep">App Store</a>
        <a href="https://fonts.googleapis.com/css2?family=Inter">Font</a>
        <a href="mailto:help@bleep.is">Email</a>
        <a href="#export-import">Export</a>
        <a href="https://rolando.is">Rolando</a>
    `;
    assert.equal(rewritePreviewContent(input, base), input);
});

test("prefixes absolute bleep.is URLs, including redirects", () => {
    const input = `
        <meta property="og:url" content="https://bleep.is">
        <meta property="og:image" content="https://bleep.is/preview.png">
        <meta http-equiv="refresh" content="0;url=https://bleep.is/support/extensions/#install-on-safari">
        <link rel="canonical" href="https://bleep.is/pr-preview/pr-99/support/notes">
    `;
    const output = rewritePreviewContent(input, base);
    assert.match(output, /content="https:\/\/bleep\.is\/pr-preview\/pr-99"/);
    assert.match(output, /content="https:\/\/bleep\.is\/pr-preview\/pr-99\/preview\.png"/);
    assert.match(
        output,
        /url=https:\/\/bleep\.is\/pr-preview\/pr-99\/support\/extensions\/#install-on-safari/,
    );
    assert.match(
        output,
        /href="https:\/\/bleep\.is\/pr-preview\/pr-99\/support\/notes"/,
    );
    assert.equal(output.match(/pr-preview\/pr-99/g).length, 4);
});

test("does not rewrite SVG namespaces or utility class names", () => {
    const input = `
        <svg xmlns="http://www.w3.org/2000/svg" class="bg-white/70 dark:bg-white/4"></svg>
    `;
    assert.equal(rewritePreviewContent(input, base), input);
});
