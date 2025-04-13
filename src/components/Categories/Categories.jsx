/** @format */

import React from "react";
import classes from "./Categories.module.css";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { Link } from "react-router-dom";
import CallBack from "../CallBack/CallBack";
import { useQuery } from "@tanstack/react-query";

export default function Categories() {
	// Use React Query to fetch categories
	const {
		data: categoriesData,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://ecommerce.routemisr.com/api/v1/categories`,
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
				<title>Categories</title>
				<meta name='description' content='Welcome to our online store' />
			</Helmet>
			<section className={classes.Categories}>
				<div className='container mx-auto px-3'>
					<h2 className='text-center text-3xl font-bold my-6'>Categories</h2>

					{isLoading ? (
						<div className='text-center py-8'>Loading categories...</div>
					) : isError ? (
						<div className='text-center py-8'>
							<p className='text-red-500 mb-4'>
								{error?.message ||
									"Failed to load categories. Please try again later."}
							</p>
							<button
								onClick={() => refetch()}
								className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'>
								Try Again
							</button>
						</div>
					) : categoriesData?.length === 0 ? (
						<div className='text-center py-8'>No categories available.</div>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
							{categoriesData?.map((category) => (
								<Link
									to={`/categories/${category._id}`}
									key={category._id}
									className='block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow'>
									<div className='flex justify-center items-center h-48 mb-4'>
										<img
											src={category.image}
											alt={`${category.name} category`}
											className='max-h-full max-w-full'
										/>
									</div>
									<h3 className='text-center text-xl font-medium'>
										{category.name}
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
