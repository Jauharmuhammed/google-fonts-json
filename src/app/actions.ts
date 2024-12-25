'use server'

import { GoogleFontSort, GoogleFontsResponse } from "@/lib/types";

export async function fetchGoogleFonts(sort?: GoogleFontSort): Promise<GoogleFontsResponse> {
  const API_KEY = process.env.GOOGLE_FONTS_API_KEY;
  
  if (!API_KEY) {
    throw new Error("Google Fonts API key is not configured");
  }

  const url = new URL('https://www.googleapis.com/webfonts/v1/webfonts');
  url.searchParams.append('key', API_KEY);
  if (sort) {
    url.searchParams.append('sort', sort);
  }

  const response = await fetch(url.toString(), { cache: 'no-store' });

  if (!response.ok) {
    throw new Error("Failed to fetch fonts");
  }

  return response.json();
}

