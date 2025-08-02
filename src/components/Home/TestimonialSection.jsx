import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Tonmoy Khan",
    photo: "https://i.ibb.co/dw36nqgH/1.png",
    quote: "CoinLeaf helped me earn extra income with flexible micro-tasks.",
  },
  {
    name: "Anik Rahman",
    photo: "https://i.ibb.co/zTtnGkgn/2.png",
    quote: "Reliable, fast, and rewarding. Perfect for side earnings!",
  },
  {
    name: "Sajid Ahmed",
    photo: "https://i.ibb.co/ks5PTk68/3.png",
    quote: "Best platform for students. Simple tasks, quick coins.",
  },
  {
    name: "Fati Ali",
    photo: "https://i.ibb.co/jkcCf5XR/4.png",
    quote: "Friendly platform and great support system. Highly recommended!",
  },
  {
    name: "Habib Ullah",
    photo: "https://i.ibb.co/kVnhQywn/5.png",
    quote: "I withdraw every week. Trustworthy and transparent.",
  },
  {
    name: "Sahariar Amin",
    photo: "https://i.ibb.co/5hQcK6r4/6.png",
    quote: "Earning from small tasks never felt this smooth.",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className='mt-20'>
          <h1 className='text-center text-2xl md:text-5xl font-extrabold text-primary mb-4 dark:text-secondary'>What Our Users Say</h1>
          <p className='text-center px-6 md:px-0 text-xs md:text-base font-normal text-gray-600 mb-2 lg:mb-8 md:mb-8 dark:text-white'>
            Loved by Thousands of Earners<br /> These are some words from our users who’ve worked , earned and give work through CoinLeaf.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={3}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((user, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white dark:bg-gray-800 mx-3 rounded-lg p-6 text-center shadow-md h-full flex flex-col justify-between">
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-20 h-20 mx-auto rounded-full border-4 border-yellow-400 object-cover mb-4"
                />
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{user.quote}"</p>
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">{user.name}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
