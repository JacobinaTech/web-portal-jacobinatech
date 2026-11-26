import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getEventos, getProjetos } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => new URL(p, site.url).toString();
  return [
    { url: u("/"), priority: 1 },
    { url: u("/projetos/"), priority: 0.9 },
    ...getProjetos().map((p) => ({ url: u(`/projetos/${p.slug}/`), priority: 0.7 })),
    ...getEventos().map((e) => ({ url: u(`/eventos/${e.slug}/`), lastModified: e.data })),
  ];
}
