'use server'

import { GoogleFontsResponse } from "@/lib/types";

export async function fetchGoogleFonts(): Promise<GoogleFontsResponse> {
  const API_KEY = process.env.GOOGLE_FONTS_API_KEY;
  
  if (!API_KEY) {
    throw new Error("Google Fonts API key is not configured");
  }

  const response = await fetch(
    `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`,
    { cache: 'no-store' } // Disable caching since response is >2MB
  );

  if (!response.ok) {
    throw new Error("Failed to fetch fonts");
  }

  return response.json();
}

