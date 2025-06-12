/** @format */

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import img1 from "../../assets/grocery-banner-2.jpeg";
import img2 from "../../assets/grocery-banner.png";
import slide1 from "../../assets/slider-image-1.jpeg";
import slide2 from "../../assets/slider-image-2.jpeg";
import slide3 from "../../assets/slider-image-3.jpeg";

export default function MainSlider() {
	return (
		<section className='py-8 md:py-12 bg-gradient-to-b from-gray-50 to-white'>
			<div className='container mx-auto px-4'>
				<div className='flex flex-col md:flex-row md:space-x-6'>
					{/* Main Slider - Full width on mobile, 2/3 on desktop */}
					<div className='w-full md:w-2/3 mb-6 md:mb-0'>
						<Swiper
							modules={[Autoplay, Navigation, Pagination, EffectFade]}
							navigation
							pagination={{
								clickable: true,
								renderBullet: function (index, className) {
									return '<span class="' + className + ' bg-teal-500"></span>';
								},
							}}
							effect='fade'
							autoplay={{
								delay: 3000,
								disableOnInteraction: false,
							}}
							loop={true}
							speed={800}
							className='rounded-2xl overflow-hidden h-[300px] md:h-[400px] shadow-xl hover:shadow-2xl transition-shadow duration-300'>
							<SwiperSlide>
								<div className='relative group'>
									<img
										src={slide1}
										alt='Featured products'
										className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
										<div className='absolute bottom-6 left-6 text-white'>
											<h3 className='text-2xl font-bold mb-2'>
												Fresh Groceries
											</h3>
											<p className='text-sm'>Shop the latest arrivals</p>
										</div>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className='relative group'>
									<img
										src={slide2}
										alt='Special offers'
										className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
										<div className='absolute bottom-6 left-6 text-white'>
											<h3 className='text-2xl font-bold mb-2'>
												Special Offers
											</h3>
											<p className='text-sm'>Limited time deals</p>
										</div>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className='relative group'>
									<img
										src={slide3}
										alt='New arrivals'
										className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
										<div className='absolute bottom-6 left-6 text-white'>
											<h3 className='text-2xl font-bold mb-2'>New Arrivals</h3>
											<p className='text-sm'>Discover fresh products</p>
										</div>
									</div>
								</div>
							</SwiperSlide>
						</Swiper>
					</div>

					{/* Banner Images - Side by side on mobile, stacked on desktop */}
					<div className='w-full md:w-1/3'>
						<div className='grid grid-cols-2 md:grid-cols-1 gap-6 h-full'>
							<div className='rounded-2xl overflow-hidden h-[190px] md:h-[190px] group shadow-lg hover:shadow-xl transition-shadow duration-300'>
								<div className='relative h-full'>
									<img
										src={img1}
										alt='Promotional banner'
										className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
										<div className='absolute bottom-4 left-4 text-white'>
											<h4 className='text-lg font-semibold'>Special Deals</h4>
										</div>
									</div>
								</div>
							</div>
							<div className='rounded-2xl overflow-hidden h-[190px] md:h-[190px] group shadow-lg hover:shadow-xl transition-shadow duration-300'>
								<div className='relative h-full'>
									<img
										src={img2}
										alt='Special offers banner'
										className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
										<div className='absolute bottom-4 left-4 text-white'>
											<h4 className='text-lg font-semibold'>Fresh Products</h4>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
