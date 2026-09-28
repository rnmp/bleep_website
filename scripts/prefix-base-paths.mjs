import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const TEXT_EXTENSIONS = new Set([".html", ".css", ".js", ".svg", ".mjs"]);

/**
 * Prefix root-relative and https://bleep.is URLs so a preview served from
 * /pr-preview/pr-<number>/ can load its own pages and assets.
 * Already-prefixed URLs are left alone.
 */
export function rewritePreviewContent(
    content,
    base,
    origin = "https://bleep.is",
) {
    const escapedOrigin = escapeRegExp(origin);
    const escapedBase = escapeRegExp(base);
    const withSite = content.replace(
        new RegExp(
            `${escapedOrigin}(?!${escapedBase}(?:/|["'\\s]|$))`,
            "g",
        ),
        `${origin}${base}`,
    );

    return withSite.replace(
        /(^|["'(=\s,])(\/(?!\/)[^\s"'()<>]*)/g,
        (match, pre, url) => `${pre}${prefixPath(url, base)}`,
    );
}

export function prefixPath(url, base) {
    if (url === base || url.startsWith(`${base}/`)) return url;
    return `${base}${url.startsWith("/") ? url : `/${url}`}`;
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function collectFiles(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...(await collectFiles(fullPath)));
        } else if (TEXT_EXTENSIONS.has(path.extname(entry.name))) {
            files.push(fullPath);
        }
    }
    return files;
}

async function main() {
    const base = process.env.BASE_PATH?.replace(/\/$/, "") || "";
    if (!base) return;
    if (!/^\/pr-preview\/pr-\d+$/.test(base)) {
        throw new Error(
            `BASE_PATH must look like /pr-preview/pr-123 (received ${process.env.BASE_PATH})`,
        );
    }

    const dist = path.resolve("dist");
    const files = await collectFiles(dist);
    let rewritten = 0;
    for (const file of files) {
        const original = await readFile(file, "utf8");
        const next = rewritePreviewContent(original, base);
        if (next !== original) {
            await writeFile(file, next);
            rewritten += 1;
        }
    }
    console.log(
        `Prefixed ${rewritten} file(s) in dist with base ${base}`,
    );
}

const isDirectRun = process.argv[1] &&
    path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);

if (isDirectRun) {
    main().catch((error) => {
        console.error(error);
        process.exit(1);
    });
}
