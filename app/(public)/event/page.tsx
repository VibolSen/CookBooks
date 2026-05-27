import Event from '@/app/components/Event';
import BannerSwiper from '@/app/components/BannerSwiper';

export default function EventPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <div className="w-full flex-none">
        <BannerSwiper />
      </div>

      {/* Centered Event Content */}
      <div className="container mx-auto px-4 py-12 flex-1">
        <Event />
      </div>
    </main>
  );
}
