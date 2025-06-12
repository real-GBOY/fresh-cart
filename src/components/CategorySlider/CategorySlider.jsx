/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./CategorySlider.module.css";

export default function CategorySlider() {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get(
					"https://ecommerce.routemisr.com/api/v1/categories"
				);
				setCategories(response.data.data);
				setLoading(false);
			} catch (err) {
				setError("Failed to fetch categories");
				setLoading(false);
				console.error("Error fetching categories:", err);
			}
		};

		fetchCategories();
	}, []);

	// Modern slider settings with smoother animations
	const settings = {
		dots: true,
		infinite: true,
		speed: 600,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4000,
		pauseOnHover: true,
		cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
		responsive: [
			{
				breakpoint: 1280,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	if (loading) {
		return (
			<section className={classes.categorySlider}>
				<div className='container mx-auto px-4 py-12'>
					<div className='animate-pulse'>
						<div className='h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48 mb-8'></div>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
							{[...Array(4)].map((_, i) => (
								<div key={i} className='bg-white rounded-2xl p-6 shadow-lg'>
									<div className='h-40 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl mb-4'></div>
									<div className='h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-2'></div>
									<div className='h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4'></div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className={classes.categorySlider}>
				<div className='container mx-auto px-4 py-12'>
					<div className='text-center py-16'>
						<div className='w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center'>
							<svg
								className='w-8 h-8 text-red-500'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
						</div>
						<h3 className='text-xl font-semibold text-gray-900 mb-2'>
							Something went wrong
						</h3>
						<p className='text-gray-600'>{error}</p>
					</div>
				</div>
			</section>
		);
	}

	if (categories.length === 0) {
		return (
			<section className={classes.categorySlider}>
				<div className='container mx-auto px-4 py-12'>
					<div className='text-center py-16'>
						<div className='w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center'>
							<svg
								className='w-8 h-8 text-gray-400'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
								/>
							</svg>
						</div>
						<h3 className='text-xl font-semibold text-gray-900 mb-2'>
							No categories found
						</h3>
						<p className='text-gray-600'>Check back later for new categories</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section
			className={`${classes.categorySlider} py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50`}>
			<div className='container mx-auto px-4'>
				{/* Modern header with gradient text */}
				<div className='text-center mb-12'>
					<h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-8'>
						Explore Categories
					</h2>
					<p className='text-lg text-gray-600 max-w-2xl mx-auto'>
						Discover our curated collection of premium categories tailored just
						for you
					</p>
					<div className='w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full'></div>
				</div>

				{/* Modern slider with enhanced styling */}
				<div className='relative'>
					<Slider {...settings} className={classes.modernSlider}>
						{categories.map((category, index) => (
							<div key={category._id} className='px-3'>
								<div className='group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2'>
									{/* Gradient overlay */}
									<div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10'></div>

									{/* Image container with modern effects */}
									<div className='relative overflow-hidden'>
										{category.image ? (
											<>
												<img
													src={category.image}
													alt={category.name}
													className='w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110'
													loading='lazy'
												/>
												<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
											</>
										) : (
											<div className='w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center'>
												<svg
													className='w-12 h-12 text-gray-400'
													fill='none'
													stroke='currentColor'
													viewBox='0 0 24 24'>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
													/>
												</svg>
											</div>
										)}
									</div>

									{/* Content with modern typography */}
									<div className='p-6 relative z-20'>
										<h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300'>
											{category.name}
										</h3>
										{category.description && (
											<p className='text-gray-600 text-sm leading-relaxed line-clamp-2'>
												{category.description}
											</p>
										)}

										{/* Modern CTA button */}
										<div className='mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
											<button className='inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200'>
												Explore now
												<svg
													className='ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1'
													fill='none'
													stroke='currentColor'
													viewBox='0 0 24 24'>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M17 8l4 4m0 0l-4 4m4-4H3'
													/>
												</svg>
											</button>
										</div>
									</div>

									{/* Decorative elements */}
									<div className='absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100'>
										<span className='text-xs font-bold text-gray-700'>
											#{index + 1}
										</span>
									</div>
								</div>
							</div>
						))}
					</Slider>
				</div>

				{/* Modern stats or additional info */}
				<div className='text-center mt-12'>
					<p className='text-gray-500 text-sm'>
						Showing {categories.length} premium categories • Updated daily
					</p>
				</div>
			</div>
		</section>
	);
}
