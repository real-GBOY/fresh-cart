/** @format */

import React, { useEffect, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Product from "../Product/Product";

export default function RecentProducts() {
	// Use React Query's useInfiniteQuery for pagination
	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status,
		isLoading,
	} = useInfiniteQuery({
		queryKey: ["products"],
		queryFn: async ({ pageParam = 1 }) => {
			const response = await axios.get(
				"https://ecommerce.routemisr.com/api/v1/products",
				{
					params: { page: pageParam, limit: 10 },
				}
			);
			return response.data;
		},
		getNextPageParam: (lastPage, pages) => {
			// If the last page has less than 10 items, we've reached the end
			return lastPage.data.length === 0 ? undefined : pages.length + 1;
		},
		// Additional options
		refetchOnWindowFocus: false,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});

	// Flatten the pages data into a single array of products
	const products = data?.pages.flatMap((page) => page.data) || [];

	// Infinite Scroll Handler
	const handleScroll = useCallback(() => {
		if (
			window.innerHeight + document.documentElement.scrollTop >=
				document.documentElement.offsetHeight - 100 &&
			hasNextPage &&
			!isFetchingNextPage
		) {
			fetchNextPage();
		}
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	// Attach Scroll Event Listener
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	// Creative Cart Loader Component
	const CreativeCartLoader = () => (
		<div className='creative-loader-container'>
			<div className='shopping-scene'>
				<div className='cloud cloud-1'></div>
				<div className='cloud cloud-2'></div>
				<div className='cloud cloud-3'></div>

				<div className='shop'>
					<div className='shop-roof'></div>
					<div className='shop-body'>
						<div className='shop-window'></div>
						<div className='shop-door'></div>
					</div>
				</div>

				<div className='cart-character'>
					<div className='cart-body'>
						<div className='cart-basket'></div>
						<div className='cart-handle'></div>
					</div>
					<div className='cart-wheel cart-wheel-left'></div>
					<div className='cart-wheel cart-wheel-right'></div>

					<div className='product product-1'>
						<div className='product-box'></div>
						<div className='product-tag'></div>
					</div>
					<div className='product product-2'>
						<div className='product-box'></div>
						<div className='product-tag'></div>
					</div>
					<div className='product product-3'>
						<div className='product-box'></div>
						<div className='product-tag'></div>
					</div>

					<div className='cart-face'>
						<div className='cart-eye cart-eye-left'></div>
						<div className='cart-eye cart-eye-right'></div>
						<div className='cart-smile'></div>
					</div>
				</div>

				<div className='road'></div>
			</div>
			<p className='loader-text'>Shopping for amazing products...</p>
		</div>
	);

	// Error Handling UI
	if (status === "error") {
		return (
			<section className='py-10 bg-red-50 text-center min-h-screen flex flex-col justify-center items-center'>
				<div className='container mx-auto px-4'>
					<h2 className='text-2xl font-bold text-red-600 mb-4'>
						Error Loading Products
					</h2>
					<p className='text-red-500'>{error.message}</p>
					<button
						onClick={() => {
							window.location.reload();
						}}
						className='mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors'>
						Retry
					</button>
				</div>
			</section>
		);
	}

	return (
		<>
			{/* CSS for the creative cart loader animation */}
			<style jsx>{`
				.creative-loader-container {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 100%;
					padding: 3rem 0;
					overflow: hidden;
				}

				.shopping-scene {
					position: relative;
					width: 280px;
					height: 180px;
					margin-bottom: 1rem;
				}

				/* Clouds */
				.cloud {
					position: absolute;
					background-color: #f3f4f6;
					border-radius: 50px;
				}

				.cloud-1 {
					width: 60px;
					height: 20px;
					top: 20px;
					left: 20px;
					animation: float-cloud 8s infinite ease-in-out;
				}

				.cloud-2 {
					width: 80px;
					height: 25px;
					top: 40px;
					right: 30px;
					animation: float-cloud 12s infinite ease-in-out reverse;
				}

				.cloud-3 {
					width: 50px;
					height: 15px;
					top: 15px;
					left: 120px;
					animation: float-cloud 10s infinite ease-in-out 2s;
				}

				@keyframes float-cloud {
					0%,
					100% {
						transform: translateX(0);
					}
					50% {
						transform: translateX(20px);
					}
				}

				/* Shop */
				.shop {
					position: absolute;
					left: 20px;
					bottom: 40px;
					width: 80px;
					height: 70px;
				}

				.shop-roof {
					position: absolute;
					width: 0;
					height: 0;
					border-left: 40px solid transparent;
					border-right: 40px solid transparent;
					border-bottom: 30px solid #14b8a6;
					top: -30px;
				}

				.shop-body {
					position: absolute;
					width: 80px;
					height: 70px;
					background-color: #0d9488;
					border-radius: 5px;
				}

				.shop-window {
					position: absolute;
					width: 30px;
					height: 25px;
					background-color: #bae6fd;
					top: 10px;
					left: 10px;
					border-radius: 3px;
					box-shadow: 0 0 0 3px #0f766e;
					animation: shop-glow 2s infinite alternate;
				}

				@keyframes shop-glow {
					0% {
						opacity: 0.7;
					}
					100% {
						opacity: 1;
					}
				}

				.shop-door {
					position: absolute;
					width: 20px;
					height: 35px;
					background-color: #0f766e;
					bottom: 0;
					right: 15px;
					border-radius: 3px 3px 0 0;
				}

				/* Cart Character */
				.cart-character {
					position: absolute;
					width: 60px;
					height: 45px;
					bottom: 40px;
					right: 50px;
					animation: cart-move 3s infinite;
					transform-origin: bottom center;
				}

				@keyframes cart-move {
					0%,
					100% {
						transform: translateX(0) rotate(0deg);
						right: 50px;
					}
					10% {
						transform: translateX(0) rotate(3deg);
					}
					15% {
						transform: translateX(0) rotate(-2deg);
					}
					50% {
						transform: translateX(-150px) rotate(0deg);
						right: 180px;
					}
					60% {
						transform: translateX(-150px) rotate(-3deg);
					}
					65% {
						transform: translateX(-150px) rotate(2deg);
					}
					70% {
						transform: translateX(-150px) rotate(0deg);
					}
				}

				.cart-body {
					position: absolute;
					width: 50px;
					height: 25px;
					background-color: #14b8a6;
					border-radius: 5px 5px 0 0;
					bottom: 10px;
					left: 5px;
				}

				.cart-basket {
					position: absolute;
					width: 40px;
					height: 15px;
					background-color: #0d9488;
					bottom: 0;
					left: 5px;
					border-radius: 3px 3px 0 0;
				}

				.cart-handle {
					position: absolute;
					width: 15px;
					height: 8px;
					background-color: #0f766e;
					border-radius: 5px;
					top: 0;
					right: 0;
					animation: handle-bounce 0.5s infinite alternate;
				}

				@keyframes handle-bounce {
					0% {
						transform: translateY(0);
					}
					100% {
						transform: translateY(-2px);
					}
				}

				.cart-wheel {
					position: absolute;
					width: 12px;
					height: 12px;
					background-color: #0f766e;
					border-radius: 50%;
					bottom: 0;
					border: 2px solid #064e3b;
					animation: wheel-spin 0.5s infinite linear;
				}

				.cart-wheel:before {
					content: "";
					position: absolute;
					width: 6px;
					height: 2px;
					background-color: #064e3b;
					top: 5px;
					left: 1px;
				}

				.cart-wheel-left {
					left: 10px;
				}

				.cart-wheel-right {
					right: 15px;
				}

				@keyframes wheel-spin {
					0% {
						transform: rotate(0deg);
					}
					100% {
						transform: rotate(360deg);
					}
				}

				/* Cart Face */
				.cart-face {
					position: absolute;
					width: 30px;
					height: 20px;
					left: 10px;
					top: 0;
				}

				.cart-eye {
					position: absolute;
					width: 6px;
					height: 6px;
					background-color: #064e3b;
					border-radius: 50%;
					top: 5px;
					animation: blink 3s infinite;
				}

				@keyframes blink {
					0%,
					23%,
					25%,
					100% {
						height: 6px;
					}
					24% {
						height: 1px;
					}
				}

				.cart-eye-left {
					left: 5px;
				}

				.cart-eye-right {
					right: 5px;
				}

				.cart-smile {
					position: absolute;
					width: 14px;
					height: 7px;
					border-bottom: 3px solid #064e3b;
					border-radius: 0 0 10px 10px;
					bottom: 3px;
					left: 8px;
				}

				/* Products */
				.product {
					position: absolute;
					animation: product-bounce 1s infinite alternate;
				}

				.product-1 {
					top: -20px;
					left: 5px;
					animation-delay: 0.2s;
				}

				.product-2 {
					top: -28px;
					left: 20px;
					animation-delay: 0.5s;
				}

				.product-3 {
					top: -23px;
					left: 35px;
					animation-delay: 0.3s;
				}

				@keyframes product-bounce {
					0% {
						transform: translateY(0);
					}
					100% {
						transform: translateY(-3px);
					}
				}

				.product-box {
					width: 12px;
					height: 12px;
					background-color: #fcd34d;
					border-radius: 2px;
					box-shadow: 0 0 0 1px #ca8a04;
				}

				.product-1 .product-box {
					background-color: #f87171;
					box-shadow: 0 0 0 1px #b91c1c;
				}

				.product-2 .product-box {
					background-color: #60a5fa;
					box-shadow: 0 0 0 1px #2563eb;
				}

				.product-tag {
					position: absolute;
					width: 6px;
					height: 6px;
					background-color: white;
					top: -5px;
					right: -2px;
					border-radius: 50%;
					border: 1px solid #d1d5db;
				}

				/* Road */
				.road {
					position: absolute;
					width: 100%;
					height: 15px;
					background-color: #4b5563;
					bottom: 28px;
					left: 0;
				}

				.road:after {
					content: "";
					position: absolute;
					width: 100%;
					height: 2px;
					background-color: #e5e7eb;
					top: 50%;
					left: 0;
					background: repeating-linear-gradient(
						to right,
						#e5e7eb,
						#e5e7eb 10px,
						transparent 10px,
						transparent 20px
					);
				}

				.loader-text {
					font-size: 1rem;
					color: #0d9488;
					font-weight: 600;
					margin-top: 1rem;
					position: relative;
				}

				.loader-text:after {
					content: "...";
					position: absolute;
					animation: loading-dots 1.5s infinite;
				}

				@keyframes loading-dots {
					0% {
						content: ".";
					}
					33% {
						content: "..";
					}
					66% {
						content: "...";
					}
				}
			`}</style>
			<section className='py-10 bg-gray-50 min-h-screen flex flex-col mt-5'>
				<div className='container mx-auto px-4 flex-grow flex flex-col'>
					<h2 className='text-2xl font-bold text-gray-800 mb-6'>
						Recent Products
					</h2>

					{/* Initial loading state with creative cart loader */}
					{isLoading && (
						<div className='flex-grow flex items-center justify-center'>
							<CreativeCartLoader />
						</div>
					)}

					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 flex-grow'>
						{products.map((product) => (
							<Product key={product._id} product={product} />
						))}

						{/* Skeleton loading for additional products */}
						{isFetchingNextPage &&
							[...Array(5)].map((_, index) => (
								<div
									key={index}
									className='bg-white shadow-md rounded-lg p-4 animate-pulse'>
									<div className='h-32 bg-gray-300 rounded-md mb-2'></div>
									<div className='h-4 bg-gray-300 mb-2 w-3/4'></div>
									<div className='h-4 bg-gray-300 w-1/2'></div>
								</div>
							))}
					</div>

					{/* Loading more products indicator with mini cart loader */}
					{isFetchingNextPage && (
						<div className='flex justify-center mt-6'>
							<div
								className='shopping-scene'
								style={{ transform: "scale(0.5)", margin: 0 }}>
								<div
									className='cart-character'
									style={{
										position: "relative",
										right: 0,
										animation: "cart-move 2s infinite",
									}}>
									<div className='cart-body'>
										<div className='cart-basket'></div>
										<div className='cart-handle'></div>
									</div>
									<div className='cart-wheel cart-wheel-left'></div>
									<div className='cart-wheel cart-wheel-right'></div>
									<div className='cart-face'>
										<div className='cart-eye cart-eye-left'></div>
										<div className='cart-eye cart-eye-right'></div>
										<div className='cart-smile'></div>
									</div>
									<div className='product product-1'>
										<div className='product-box'></div>
										<div className='product-tag'></div>
									</div>
									<div className='product product-2'>
										<div className='product-box'></div>
										<div className='product-tag'></div>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* No more products message */}
					{!hasNextPage && products.length > 0 && (
						<div className='text-center mt-10 py-5 border-t border-gray-200'>
							<svg
								className='mx-auto h-10 w-10 text-teal-500'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M5 13l4 4L19 7'
								/>
							</svg>
							<p className='mt-2 text-gray-600'>
								You've seen all our amazing products!
							</p>
						</div>
					)}

					{/* Empty state */}
					{status === "success" && products.length === 0 && (
						<div className='text-center py-10 bg-white rounded-lg shadow-sm flex-grow flex flex-col justify-center items-center'>
							<div
								className='empty-cart-animation mx-auto'
								style={{ width: "80px", height: "80px", position: "relative" }}>
								<svg
									className='h-20 w-20 text-gray-400'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={1.5}
										d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
									/>
								</svg>
							</div>
							<h3 className='mt-2 text-lg font-medium text-gray-900'>
								Your shopping cart is empty
							</h3>
							<p className='mt-1 text-sm text-gray-500'>
								Looks like you haven't found anything yet!
							</p>
							<button
								onClick={() => {
									window.location.reload();
								}}
								className='mt-4 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors'>
								Start Shopping
							</button>
						</div>
					)}
				</div>
			</section>
		</>
	);
}
