import type { NextConfig } from "next";

/**
 * Site 100% estático (`next build` gera a pasta `out/`).
 * Pode ser hospedado em qualquer servidor/CDN: GitHub Pages, Netlify, S3, Firebase Hosting etc.
 * Se um dia precisar de backend (formulários, CMS, auth), basta remover `output: "export"`.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
