import { fetchGoogleFonts } from "@/app/actions";
import Home from "@/components/pages/home";

export default async function HomePage() {
  // Fetch data on the server
  const fonts = await fetchGoogleFonts();

  // Derive static values on the server
  const categories = Array.from(
    new Set(fonts.items.map((font) => font.category))
  );
  const subsets = Array.from(
    new Set(fonts.items.flatMap((font) => font.subsets))
  );
  const variants = Array.from(
    new Set(fonts.items.flatMap((font) => font.variants))
  );

  return (
    <Home
      initialFonts={fonts.items}
      categories={categories}
      subsets={subsets}
      variants={variants}
    />
  );
}
