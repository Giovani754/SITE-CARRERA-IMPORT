import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/data/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/adm", "/adm/", "/debug", "/debug/"],
    },
    sitemap: `${SITE_CONFIG.domain}/sitemap.xml`,
  };
}
