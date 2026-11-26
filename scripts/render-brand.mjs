#!/usr/bin/env node
/**
 * Renderiza as peças de marca a partir dos templates em brand/*.html usando o Chrome headless.
 *   npm run brand
 * Saídas:
 *   src/app/opengraph-image.png + twitter-image.png  (1200×630 — usadas pelo Next no <head>)
 *   brand/out/avatar.png                              (1080×1080 — Instagram/LinkedIn)
 *   public/projetos/<slug>/capa.webp                  (1280×720 — capa de cada brand/projetos/<slug>.html)
 * Chrome: defina CHROME_PATH se não estiver no caminho padrão do macOS/Linux.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const brandDir = path.join(root, "brand");

const chrome =
  process.env.CHROME_PATH ??
  ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium"].find(
    existsSync,
  );
if (!chrome) throw new Error("Chrome não encontrado. Defina CHROME_PATH.");

// Módulos ES não carregam via file://, então servimos brand/ num servidor local efêmero.
const types = { ".html": "text/html", ".js": "text/javascript" };
const server = createServer(async (req, res) => {
  try {
    const file = path.join(brandDir, path.normalize(req.url.split("?")[0]).replace(/^(\.\.[/\\])+/, ""));
    const body = await readFile(file); // lê antes de enviar cabeçalhos: se falhar, o catch responde 404
    res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

// Assíncrono de propósito: um exec síncrono bloquearia o servidor acima (mesmo processo) e o Chrome nunca receberia a página.
const run = promisify(execFile);
const shot = async (page, w, h, out) => {
  mkdirSync(path.dirname(out), { recursive: true });
  await run(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    `--window-size=${w},${h}`,
    "--virtual-time-budget=8000",
    `--screenshot=${out}`,
    `${base}/${page}`,
  ], { timeout: 60_000 });
  console.log(`✓ ${path.relative(root, out)} (${w}×${h})`);
};

try {
  const og = path.join(root, "src/app/opengraph-image.png");
  await shot("og.html", 1200, 630, og);
  copyFileSync(og, path.join(root, "src/app/twitter-image.png"));
  console.log("✓ src/app/twitter-image.png (cópia)");
  await shot("avatar.html", 1080, 1080, path.join(brandDir, "out/avatar.png"));

  // Capas dos projetos: brand/projetos/<slug>.html → public/projetos/<slug>/capa.webp
  // (use no frontmatter: capa: /projetos/<slug>/capa.webp)
  for (const file of readdirSync(path.join(brandDir, "projetos")).filter((f) => f.endsWith(".html"))) {
    const slug = file.replace(/\.html$/, "");
    await shot(`projetos/${file}`, 1280, 720, path.join(root, "public/projetos", slug, "capa.webp"));
  }
} finally {
  server.close();
}
