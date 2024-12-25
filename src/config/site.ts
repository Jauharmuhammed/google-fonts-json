import { env } from "@/env";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  title: "Google Fonts JSON - Search and Download",
  description: "Search, filter and download Google Fonts in JSON format",
  url:
    env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_SITE_URL,
  links: {
    github: "https://github.com/jason-s-dev/google-fonts-json",
  },
  keywords: [
    "google fonts",
    "json",
    "download",
    "api",
    "search",
    "filter",
    "sort",
    "fonts",
    "fonts json",
    "fonts json download",
    "fonts json api",
    "fonts json search",
    "fonts json filter",
    "fonts json sort",
  ],
} as const;
