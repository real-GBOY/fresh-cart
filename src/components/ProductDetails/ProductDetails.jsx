/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import RelatedProducts from "../RelatedProducts/RelatedProducts.jsx";
import {
	ShoppingCart,
	Heart,
	Star,
	ChevronLeft,
	Truck,
	Shield,
	Award,
	Package,
	Image,
	Tag,
	DollarSign,
	Star as StarIcon,
} from "lucide-react";
import classes from "./ProductDetails.module.css";
import Slider from "react-slick"; //we can use it as a carousel

export default function ProductDetails() {
	// const settings = {
	// we can use it as a carousel
	// 	dots: true,
	// 	infinite: true,
	// 	speed: 500,
	// 	slidesToShow: 1,
	// 	slidesToScroll: 1,
	// };
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [activeImage, setActiveImage] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [wishlist, setWishlist] = useState(false);
	const [showNotification, setShowNotification] = useState(false);
	const [loadingProgress, setLoadingProgress] = useState(0);

	useEffect(() => {
		// Loading animation progress simulation
		if (loading) {
			const interval = setInterval(() => {
				setLoadingProgress((prev) => {
					const newProgress = prev + Math.random() * 15;
					return newProgress >= 100 ? 100 : newProgress;
				});
			}, 300);

			return () => clearInterval(interval);
		}
	}, [loading]);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				setLoading(true);
				setLoadingProgress(0);
				const response = await axios.get(
					`https://ecommerce.routemisr.com/api/v1/products/${id}`
				);
				// Add a slight delay for the loading animation to complete
				setTimeout(() => {
					setProduct(response.data.data);
					setLoadingProgress(100);
					setLoading(false);
				}, 1200);
			} catch (err) {
				setError("Failed to load product details. Please try again later.");
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	const handleAddToCart = () => {
		// Cart functionality would go here
		setShowNotification(true);
		setTimeout(() => setShowNotification(false), 3000);
	};

	const handleWishlist = () => {
		setWishlist(!wishlist);
	};

	if (loading) {
		return (
			<div className='container mx-auto px-4 py-10'>
				<div className='mb-6 animate-pulse'>
					<div className='w-32 h-6 bg-gray-200 rounded'></div>
				</div>

				<div className='bg-white shadow-lg rounded-xl overflow-hidden lg:flex'>
					{/* Creative loading animation for product image */}
					<div className='lg:w-1/2 p-4'>
						<div className='relative h-80 mb-4 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center'>
							<Image size={40} className='text-gray-300 animate-pulse' />
							<div className='absolute bottom-0 left-0 right-0 h-1 bg-gray-200'>
								<div
									className='h-full bg-teal-500 transition-all duration-300'
									style={{ width: `${loadingProgress}%` }}></div>
							</div>
						</div>

						{/* Thumbnail loading */}
						<div className='flex space-x-2 overflow-x-auto pb-2'>
							{[1, 2, 3, 4].map((_, index) => (
								<div
									key={index}
									className='w-20 h-20 rounded-md bg-gray-100 animate-pulse'></div>
							))}
						</div>
					</div>

					{/* Product Details loading skeleton */}
					<div className='lg:w-1/2 p-6 space-y-6'>
						<div className='flex items-center justify-between'>
							<div className='w-24 h-6 bg-gray-200 rounded-full animate-pulse'></div>
							<div className='flex space-x-1'>
								{[1, 2, 3, 4, 5].map((_, i) => (
									<StarIcon key={i} size={16} className='text-gray-200' />
								))}
							</div>
						</div>

						<div className='space-y-3'>
							<div className='h-8 bg-gray-200 rounded w-3/4 animate-pulse'></div>
							<div className='h-4 bg-gray-200 rounded w-full animate-pulse'></div>
							<div className='h-4 bg-gray-200 rounded w-full animate-pulse'></div>
							<div className='h-4 bg-gray-200 rounded w-2/3 animate-pulse'></div>
						</div>

						<div className='flex items-center'>
							<div className='h-10 w-24 bg-gray-200 rounded animate-pulse'></div>
							<div className='ml-2 h-6 w-16 bg-gray-200 rounded animate-pulse'></div>
						</div>

						<div className='space-y-2'>
							<div className='h-6 w-20 bg-gray-200 rounded animate-pulse'></div>
							<div className='flex items-center space-x-2'>
								<div className='w-10 h-10 bg-gray-200 rounded-l-md'></div>
								<div className='w-16 h-10 bg-gray-200'></div>
								<div className='w-10 h-10 bg-gray-200 rounded-r-md'></div>
							</div>
						</div>

						<div className='space-y-3'>
							<div className='h-12 bg-gray-200 rounded animate-pulse'></div>
							<div className='h-12 bg-gray-200 rounded animate-pulse'></div>
						</div>

						<div className='grid grid-cols-3 gap-4'>
							{[Truck, Shield, Award].map((Icon, index) => (
								<div
									key={index}
									className='flex flex-col items-center text-center animate-pulse'>
									<div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2'>
										<Icon size={18} className='text-gray-300' />
									</div>
									<div className='h-4 w-16 bg-gray-200 rounded'></div>
								</div>
							))}
						</div>

						{/* Loading indicators */}
						<div className='flex items-center justify-center mt-4 text-sm text-gray-500'>
							<Package size={16} className='mr-2 animate-bounce' />
							<span>Unwrapping your product...</span>
							<span className='ml-2'>{Math.round(loadingProgress)}%</span>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex flex-col items-center justify-center h-96 text-center'>
				<div className='text-red-500 text-xl mb-4'>😕 {error}</div>
				<button
					onClick={() => window.location.reload()}
					className='px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700'>
					Try Again
				</button>
			</div>
		);
	}

	// Create an array of product images including the cover
	const productImages = [product.imageCover, ...(product.images || [])];

	return (
		<>
			{/* Notification */}
			{showNotification && (
				<div className='fixed top-4 right-4 bg-teal-600 text-white px-6 py-3 rounded-md shadow-lg z-50 animate-fade-in-down'>
					Product added to cart successfully!
				</div>
			)}

			<section className={`${classes.ProductDetails} py-10`}>
				<div className='container mx-auto px-4'>
					<div className='mb-6'>
						<Link
							to='/'
							className='inline-flex items-center text-teal-600 hover:text-teal-800 transition'>
							<ChevronLeft size={16} />
							<span className='ml-1'>Back to Products</span>
						</Link>
					</div>

					<div className='bg-white shadow-lg rounded-xl overflow-hidden lg:flex'>
						{/* Product Images Section */}
						<div className='lg:w-1/2 p-4'>
							<div className='relative h-80 mb-4 overflow-hidden rounded-lg'>
								<img
									src={productImages[activeImage]}
									alt={product.title}
									className='w-full h-full object-cover rounded-lg transition-transform duration-500 hover:scale-105'
								/>
								<button
									onClick={handleWishlist}
									className={`absolute top-4 right-4 p-2 rounded-full ${
										wishlist
											? "bg-red-500 text-white"
											: "bg-white text-gray-700"
									} shadow-md transition-colors duration-300`}>
									<Heart size={20} className={wishlist ? "fill-current" : ""} />
								</button>
							</div>

							{/* Thumbnail Gallery */}
							{productImages.length > 1 && (
								<div className='flex space-x-2 overflow-x-auto pb-2'>
									{productImages.map((image, index) => (
										<div
											key={index}
											onClick={() => setActiveImage(index)}
											className={`cursor-pointer w-20 h-20 rounded-md overflow-hidden border-2 ${
												activeImage === index
													? "border-teal-500"
													: "border-transparent"
											}`}>
											<img
												src={image}
												alt={`${product.title} - view ${index + 1}`}
												className='w-full h-full object-cover'
											/>
										</div>
									))}
								</div>
							)}
						</div>

						{/* Product Details Section */}
						<div className='lg:w-1/2 p-6'>
							<div className='flex items-center mb-2'>
								<span className='bg-teal-100 text-teal-800 text-xs font-semibold px-2.5 py-0.5 rounded-full'>
									{product.category?.name || "Featured"}
								</span>
								<div className='ml-auto flex items-center'>
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											size={16}
											className={`${
												i < Math.floor(product.ratingsAverage)
													? "text-yellow-400 fill-current"
													: "text-gray-300"
											}`}
										/>
									))}
									<span className='text-sm text-gray-600 ml-1'>
										({product.ratingsQuantity || 0} reviews)
									</span>
								</div>
							</div>

							<h1 className='text-3xl font-bold text-gray-800 mb-2'>
								{product.title}
							</h1>

							<p className='text-gray-600 mb-6'>{product.description}</p>

							<div className='mb-6'>
								<div className='flex items-baseline'>
									<span className='text-3xl font-bold text-teal-600'>
										{product.price} EGP
									</span>
									{product.priceAfterDiscount && (
										<span className='ml-2 text-lg text-gray-500 line-through'>
											{product.priceAfterDiscount} EGP
										</span>
									)}
								</div>
								{product.priceAfterDiscount && (
									<div className='mt-1 inline-block bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>
										Save{" "}
										{Math.round(
											(1 - product.price / product.priceAfterDiscount) * 100
										)}
										%
									</div>
								)}
							</div>

							{/* Quantity Selector */}
							<div className='mb-6'>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Quantity
								</label>
								<div className='flex items-center'>
									<button
										onClick={() => setQuantity(Math.max(1, quantity - 1))}
										className='w-10 h-10 bg-gray-200 rounded-l-md flex items-center justify-center hover:bg-gray-300'>
										-
									</button>
									<input
										type='number'
										min='1'
										value={quantity}
										onChange={(e) =>
											setQuantity(Math.max(1, parseInt(e.target.value) || 1))
										}
										className='w-16 h-10 border-gray-200 text-center focus:ring-teal-500 focus:border-teal-500'
									/>
									<button
										onClick={() => setQuantity(quantity + 1)}
										className='w-10 h-10 bg-gray-200 rounded-r-md flex items-center justify-center hover:bg-gray-300'>
										+
									</button>
								</div>
							</div>

							{/* Action Buttons */}
							<div className='flex flex-col space-y-3'>
								<button
									onClick={handleAddToCart}
									className='flex items-center justify-center bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition shadow-md'>
									<ShoppingCart size={20} className='mr-2' />
									Add to Cart
								</button>

								<button
									onClick={() => (window.location.href = "/checkout")}
									className='border border-teal-600 text-teal-600 py-3 px-6 rounded-lg hover:bg-teal-50 transition'>
									Buy Now
								</button>
							</div>

							{/* Features */}
							<div className='mt-8 grid grid-cols-3 gap-4'>
								<div className='flex flex-col items-center text-center'>
									<div className='w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2'>
										<Truck size={18} className='text-teal-600' />
									</div>
									<span className='text-xs text-gray-600'>Free Shipping</span>
								</div>
								<div className='flex flex-col items-center text-center'>
									<div className='w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2'>
										<Shield size={18} className='text-teal-600' />
									</div>
									<span className='text-xs text-gray-600'>Warranty</span>
								</div>
								<div className='flex flex-col items-center text-center'>
									<div className='w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2'>
										<Award size={18} className='text-teal-600' />
									</div>
									<span className='text-xs text-gray-600'>Premium Quality</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Related Products */}
			<RelatedProducts />
		</>
	);
}
