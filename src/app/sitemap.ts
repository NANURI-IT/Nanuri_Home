import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://nanuriit.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    { path: "", priority: 1.0 },
    { path: "/about", priority: 0.9 },
    { path: "/contact", priority: 0.9 },
    { path: "/services/financial-si", priority: 0.8 },
    { path: "/services/ibims", priority: 0.8 },
    { path: "/services/proprietary", priority: 0.8 },
    { path: "/services/sto", priority: 0.8 },
    { path: "/services/accounting", priority: 0.8 },
    { path: "/services/channel", priority: 0.8 },
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));
}
