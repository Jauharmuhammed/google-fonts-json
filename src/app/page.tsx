import { Suspense } from "react";
import { fetchGoogleFonts } from "@/app/actions";
import Home from "@/components/pages/home";
import { GoogleFontSort } from "@/lib/types";
import { Loader } from "@/components/ui/loader";

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: { sort?: GoogleFontSort }
}

export default async function HomePage({ searchParams }: PageProps) {
  const fonts = await fetchGoogleFonts(searchParams.sort);

  // Derive static values on the server
  const categories = Array.from(new Set(fonts.items.map((font) => font.category)));
  const subsets = Array.from(new Set(fonts.items.flatMap((font) => font.subsets)));
  const variants = Array.from(new Set(fonts.items.flatMap((font) => font.variants)));

  return (
    <Home
      initialFonts={fonts.items}
      categories={categories}
      subsets={subsets}
      variants={variants}
      initialSort={searchParams.sort || 'popularity'}
    />
  );
}
