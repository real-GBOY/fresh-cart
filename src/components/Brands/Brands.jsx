/** @format */

import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Brands() {
	const navigate = useNavigate();
	const {
		data: brandsData,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ["brands"],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://ecommerce.routemisr.com/api/v1/brands`,
				{
					params: {
						limit: 10,
					},
				}
			);
			return data.data || [];
		},
	});

	// Loading Skeleton Component
	const BrandSkeleton = () => (
		<div className='bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse'>
			<div className='h-48 bg-gray-200'></div>
			<div className='p-6'>
				<div className='h-6 bg-gray-200 rounded-full w-3/4 mx-auto'></div>
			</div>
		</div>
	);

	return (
		<>
			<Helmet>
				<title>Brands | NestShop</title>
				<meta
					name='description'
					content='Discover our curated collection of premium brands at NestShop'
				/>
			</Helmet>
			<section className='py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50'>
				<div className='container mx-auto px-4'>
					{/* Header Section */}
					<div className='text-center mb-12'>
						<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 bg-clip-text text-transparent mb-4'>
							Our Brands
						</h1>
						<p className='text-lg text-gray-600 max-w-2xl mx-auto'>
							Discover our carefully curated selection of premium brands
						</p>
						<div className='w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mt-6 rounded-full'></div>
					</div>

					{/* Brands Grid */}
					{isLoading ? (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
							{[...Array(8)].map((_, index) => (
								<BrandSkeleton key={index} />
							))}
						</div>
					) : isError ? (
						<div className='max-w-md mx-auto text-center py-12'>
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
							<p className='text-gray-600 mb-8'>
								{error?.message ||
									"Failed to load brands. Please try again later."}
							</p>
							<div className='space-x-4'>
								<button
									onClick={() => refetch()}
									className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'>
									Try Again
								</button>
								<button
									onClick={() => navigate("/error")}
									className='inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'>
									Go to Error Page
								</button>
							</div>
						</div>
					) : brandsData?.length === 0 ? (
						<div className='text-center py-12'>
							<div className='w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center'>
								<svg
									className='w-10 h-10 text-gray-400'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
									/>
								</svg>
							</div>
							<h2 className='text-2xl font-bold text-gray-900 mb-4'>
								No Brands Found
							</h2>
							<p className='text-gray-600'>
								We couldn't find any brands at the moment.
							</p>
						</div>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
							{brandsData?.map((brand) => (
								<Link
									to={`/brands/${brand._id}`}
									key={brand._id}
									className='group relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1'>
									<div className='relative aspect-w-1 aspect-h-1 w-full overflow-hidden'>
										<img
											src={
												brand.image ||
												`/brand-logos/${brand.name.toLowerCase()}.png`
											}
											alt={`${brand.name} logo`}
											className='w-full h-48 object-contain transform transition-transform duration-500 group-hover:scale-110'
										/>
										<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
											<div className='absolute bottom-4 left-4 right-4'>
												<span className='block text-center text-white font-medium'>
													View Products
												</span>
											</div>
										</div>
									</div>
									<div className='p-6'>
										<h3 className='text-xl font-semibold text-center text-gray-800 group-hover:text-teal-600 transition-colors duration-300'>
											{brand.name}
										</h3>
									</div>
								</Link>
							))}
						</div>
					)}
				</div>
			</section>
		</>
	);
}
