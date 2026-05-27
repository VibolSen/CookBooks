"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { getActiveEvents } from "@/app/actions/eventActions";
import { ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Link from "next/link";

type Event = {
  id: string;
  title: string;
  imageUrl: string;
  startDate?: Date;
  endDate?: Date;
};

const DEFAULT_EVENT: any = {
  id: "0",
  title: "Stay Tuned for Amazing Events!",
  imageUrl: "/placeholder.svg?height=500&width=1200",
};

export default function BannerSwiper() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const result = await getActiveEvents();
      if (result.success && result.data) {
        setEvents(result.data.length > 0 ? result.data : [DEFAULT_EVENT]);
      } else {
        setEvents([DEFAULT_EVENT]);
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  if (loading) return <div className="h-[300px] md:h-[350px] bg-gray-900 animate-pulse"></div>;

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        className="w-full h-[300px] md:h-[350px]"
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <div className="relative w-full h-full">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${event.imageUrl || "/placeholder.svg"})` }}
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative h-full flex flex-col justify-center items-center text-white p-8 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">{event.title}</h1>
                <Link href={`/events/${event.id}`} className="bg-brand-primary text-brand-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-brand-secondary hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                  Explore Event <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
