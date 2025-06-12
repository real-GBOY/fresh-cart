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

	// Modern Loading Skeleton
	const ProductSkeleton = () => (
		<div className='bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl'>
			<div className='relative'>
				<div className='aspect-w-1 aspect-h-1 w-full bg-gray-200 animate-pulse'></div>
				<div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent'></div>
			</div>
			<div className='p-4 space-y-3'>
				<div className='h-4 bg-gray-200 rounded-full w-3/4 animate-pulse'></div>
				<div className='h-4 bg-gray-200 rounded-full w-1/2 animate-pulse'></div>
				<div className='flex justify-between items-center'>
					<div className='h-6 bg-gray-200 rounded-full w-1/4 animate-pulse'></div>
					<div className='h-8 bg-gray-200 rounded-full w-1/4 animate-pulse'></div>
				</div>
			</div>
		</div>
	);

	// Error Handling UI
	if (status === "error") {
		return (
			<section className='min-h-screen bg-gradient-to-br from-red-50 to-white py-20'>
				<div className='container mx-auto px-4'>
					<div className='max-w-md mx-auto text-center'>
						<div className='w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center'>
							<svg
								className='w-10 h-10 text-red-500'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
						</div>
						<h2 className='text-2xl font-bold text-gray-900 mb-4'>
							Oops! Something went wrong
						</h2>
						<p className='text-gray-600 mb-8'>{error.message}</p>
						<button
							onClick={() => window.location.reload()}
							className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'>
							Try Again
						</button>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className='py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50'>
			<div className='container mx-auto px-4'>
				{/* Modern Header */}
				<div className='text-center mb-12'>
					<h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 bg-clip-text text-transparent mb-4'>
						Recent Products
					</h2>
					<p className='text-lg text-gray-600 max-w-2xl mx-auto'>
						Discover our latest collection of premium products
					</p>
					<div className='w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mt-6 rounded-full'></div>
				</div>

				{/* Products Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6'>
					{isLoading ? (
						// Loading Skeletons
						<>
							{[...Array(10)].map((_, index) => (
								<ProductSkeleton key={index} />
							))}
						</>
					) : (
						// Actual Products
						products.map((product) => (
							<Product key={product._id} product={product} />
						))
					)}

					{/* Loading More Skeletons */}
					{isFetchingNextPage &&
						[...Array(5)].map((_, index) => (
							<ProductSkeleton key={`loading-${index}`} />
						))}
				</div>

				{/* End of Products Message */}
				{!hasNextPage && products.length > 0 && (
					<div className='text-center mt-16'>
						<div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-4'>
							<svg
								className='w-8 h-8 text-teal-500'
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
						</div>
						<h3 className='text-xl font-semibold text-gray-900 mb-2'>
							You've reached the end!
						</h3>
						<p className='text-gray-600'>
							You've seen all our amazing products
						</p>
					</div>
				)}

				{/* Empty State */}
				{status === "success" && products.length === 0 && (
					<div className='text-center py-20'>
						<div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6'>
							<svg
								className='w-10 h-10 text-gray-400'
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
						<h3 className='text-2xl font-bold text-gray-900 mb-3'>
							No Products Found
						</h3>
						<p className='text-gray-600 mb-8'>
							We couldn't find any products at the moment
						</p>
						<button
							onClick={() => window.location.reload()}
							className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'>
							Refresh Page
						</button>
					</div>
				)}
			</div>
		</section>
	);
}
