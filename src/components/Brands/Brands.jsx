import React from "react";
import { Helmet } from "react-helmet-async";
import classes from "./Brands.module.css";
import CallBack from "../CallBack/CallBack";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function Brands() {
	// Use React Query to fetch brands
	const {
		data: brandsData,
		isLoading,
		isError,
		error,
		refetch
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

	return (
		<>
			<Helmet>
				<title>Brands</title>
				<meta
					name='description'
					content='Browse our collection of top brands'
				/>
			</Helmet>
			<section className={classes.Brands}>
				<div className='container mx-auto px-3'>
					<h2 className='text-center text-3xl font-bold my-6'>Brands</h2>

					{isLoading ? (
						<div className='text-center py-8'>Loading brands...</div>
					) : isError ? (
						<div className='text-center py-8'>
							<p className='text-red-500 mb-4'>
								{error?.message || "Failed to load brands. Please try again later."}
							</p>
							<button 
								onClick={() => refetch()}
								className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'>
								Try Again
							</button>
						</div>
					) : brandsData?.length === 0 ? (
						<div className='text-center py-8'>No brands available.</div>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
							{brandsData?.map((brand) => (
								<Link
									to={`/brands/${brand._id}`}
									key={brand._id}
									className='block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow'>
									<div className='flex justify-center items-center h-48 mb-4'>
										<img
											src={
												brand.image ||
												`/brand-logos/${brand.name.toLowerCase()}.png`
											}
											alt={`${brand.name} logo`}
											className='max-h-full max-w-full'
										/>
									</div>
									<h3 className='text-center text-xl font-medium'>
										{brand.name}
									</h3>
								</Link>
							))}
						</div>
					)}
				</div>
			</section>
		</>
	);
}