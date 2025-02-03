'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import Image from 'next/image';
import Link from 'next/link';

const bannerSlides = [
  {
    id: 1,
    image: '/bannerHomepage/1.png',
    title: 'Tropical Paradise Getaway',
    description: 'Relax on pristine beaches and crystal-clear waters',
    link: '/tours/tropical-paradise',
  },
  {
    id: 2,
    image: '/bannerHomepage/2.png',
    title: 'Mountain Adventure Expedition',
    description: 'Conquer peaks and breathe in the fresh mountain air',
    link: '/tours/mountain-adventure',
  },
  {
    id: 3,
    image:'/bannerHomepage/3.png',
    title: 'Cultural City Exploration',
    description: 'Immerse yourself in rich history and vibrant traditions',
    link: '/tours/cultural-city',
  },
  {
    id: 4,
    image: '/bannerHomepage/4.png',
    title: 'African Safari Experience',
    description: 'Witness majestic wildlife in their natural habitat',
    link: '/tours/african-safari',
  },
  {
    id: 5,
    image: '/bannerHomepage/5.png',
    title: 'Ancient Ruins Discovery',
    description: 'Uncover the mysteries of ancient civilizations',
    link: '/tours/ancient-ruins',
  },
  {
    id: 6,
    image: '/bannerHomepage/6.png',
    title: 'Global Culinary Journey',
    description: 'Savor exquisite flavors from around the world',
    link: '/tours/culinary-journey',
  },
];

export default function BannerSwiper() {
  return (
    <Swiper
  modules={[Autoplay]}
  spaceBetween={0}
  slidesPerView={1}
  navigation
  pagination={{ clickable: true }}
  autoplay={{ delay: 2000, disableOnInteraction: false }}
  loop={true}
  className="h-[450px] w-full rounded-3xl overflow-hidden" // Add rounded-3xl here
>
  {bannerSlides.map((slide) => (
    <SwiperSlide key={slide.id} className="rounded-3xl overflow-hidden"> {/* Add rounded-3xl here */}
      <div className="relative h-full w-full">
        <Image
          src={slide.image}
          alt={slide.title}
          layout="fill"
          objectFit="cover"
          priority
          className="rounded-3xl" // Ensure Image has rounded-3xl
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            {slide.title}
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-center max-w-3xl">
            {slide.description}
          </p>
          <Link
            href={slide.link}
            className="bg-white text-black py-3 px-8 rounded-full font-semibold hover:bg-opacity-90 transition duration-300"
          >
            Explore Now
          </Link>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

  );
}

