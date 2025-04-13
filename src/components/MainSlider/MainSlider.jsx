/** @format */

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import img1 from "../../assets/grocery-banner-2.jpeg";
import img2 from "../../assets/grocery-banner.png";
import slide1 from "../../assets/slider-image-1.jpeg";
import slide2 from "../../assets/slider-image-2.jpeg";
import slide3 from "../../assets/slider-image-3.jpeg";

export default function MainSlider() {
	return (
		<section className='py-6 md:py-10'>
			<div className='container mx-auto px-4'>
				<div className='flex flex-col md:flex-row md:space-x-4'>
					{/* Main Slider - Full width on mobile, 2/3 on desktop */}
					<div className='w-full md:w-2/3 mb-4 md:mb-0'>
						<Swiper
							modules={[Autoplay, Navigation, Pagination]}
							navigation
							pagination={{ clickable: true }}
							autoplay={{ delay: 1500, disableOnInteraction: false }}
							loop={true}
							speed={500}
							className='rounded-lg overflow-hidden h-64 md:h-80'>
							<SwiperSlide>
								<img
									src={slide1}
									alt='Featured products'
									className='w-full h-full object-cover'
								/>
							</SwiperSlide>
							<SwiperSlide>
								<img
									src={slide2}
									alt='Special offers'
									className='w-full h-full object-cover'
								/>
							</SwiperSlide>
							<SwiperSlide>
								<img
									src={slide3}
									alt='New arrivals'
									className='w-full h-full object-cover'
								/>
							</SwiperSlide>
						</Swiper>
					</div>

					{/* Banner Images - Side by side on mobile, stacked on desktop */}
					<div className='w-full md:w-1/3'>
						<div className='grid grid-cols-2 md:grid-cols-1 gap-4 h-full'>
							<div className='rounded-lg overflow-hidden h-36 md:h-36'>
								<img
									src={img1}
									alt='Promotional banner'
									className='w-full h-full object-cover'
								/>
							</div>
							<div className='rounded-lg overflow-hidden h-40 md:h-38'>
								<img
									src={img2}
									alt='Special offers banner'
									className='w-full h-full object-cover'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
