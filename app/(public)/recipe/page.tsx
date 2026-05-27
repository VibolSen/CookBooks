import Recipe from "@/app/components/Recipe";
import BannerSwiper from "@/app/components/BannerSwiper";

export default function RecipePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <div className="w-full flex-none">
        <BannerSwiper />
      </div>

      {/* Centered Recipe Content */}
      <div className="container mx-auto px-4 py-12 flex-1">
        <Recipe />
      </div>
    </main>
  );
}
