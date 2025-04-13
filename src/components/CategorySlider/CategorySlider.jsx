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
				setCategories(response.data.data); // Ensure you access the correct property
				setLoading(false);
			} catch (err) {
				setError("Failed to fetch categories");
				setLoading(false);
				console.error("Error fetching categories:", err);
			}
		};

		fetchCategories();
	}, []);

	// Slider settings
	const settings = {
		dots: true,
		infinite: true,
		speed: 100,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 1024,
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
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<section className={classes.categorySlider}>
			<div className='container mx-auto px-3'>
				<h2 className='text-2xl font-bold mb-6'>Categories</h2>

				{loading && <p>Loading categories...</p>}

				{error && <p className='text-red-500'>{error}</p>}

				{!loading && !error && categories.length === 0 && (
					<p>No categories found</p>
				)}

				{!loading && !error && categories.length > 0 && (
					<Slider {...settings}>
						{categories.map((category) => (
							<div key={category._id} className={classes.categoryItem}>
								<div className='p-4 mx-2 border rounded-lg shadow-sm hover:shadow-md transition-shadow'>
									{category.image && (
										<img
											src={category.image}
											alt={category.name}
											className='w-full h-40 object-cover rounded-t-lg mb-3'
										/>
									)}
									<h3 className='font-semibold text-lg'>{category.name}</h3>
									{category.description && (
										<p className='text-gray-600 mt-2 text-sm'>
											{category.description}
										</p>
									)}
								</div>
							</div>
						))}
					</Slider>
				)}
			</div>
		</section>
	);
}
