import { env } from "@/env"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Google Fonts JSON",
  description: "Download Google Fonts JSON with advanced filters and sorting",
  url:
    env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://googlefonts.json", // Replace with your production URL
  links: {
    github: "https://github.com/yourusername/your-repo", // Replace with your GitHub repo
  },
} as const 