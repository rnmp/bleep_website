/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
}