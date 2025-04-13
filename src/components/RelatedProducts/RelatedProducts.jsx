/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";
import axios from "axios";

export default function RelatedProducts() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [fetchedPages, setFetchedPages] = useState(new Set());

	const { category } = useParams();

	useEffect(() => {
		const getRelatedProducts = async () => {
			if (loading || fetchedPages.has(page)) return;

			try {
				setLoading(true);
				setError(null);

				const response = await axios.get(
					`https://ecommerce.routemisr.com/api/v1/products`,
					{
						params: { page, limit: 10 },
					}
				);

				const allProducts = response.data.data || [];
				const filteredProducts = allProducts.filter(
					(product) => product.category.name === category
				);

				if (filteredProducts.length === 0) {
					setHasMore(false);
				}

				setProducts((prevProducts) =>
					page === 1 ? filteredProducts : [...prevProducts, ...filteredProducts]
				);
				setFetchedPages((prev) => new Set(prev).add(page));
			} catch (err) {
				setError(err.response?.data?.message || "Server error occurred.");
			} finally {
				setLoading(false);
			}
		};

		if (category) {
			getRelatedProducts();
		}
	}, [category, page, fetchedPages]);

	if (error) {
		return (
			<section className='py-10 bg-red-50 text-center min-h-screen flex flex-col justify-center items-center'>
				<div className='container mx-auto px-4'>
					<h1 className='text-2xl font-bold'>Related Products</h1>
					<p className='text-lg text-red-500'>{error}</p>
				</div>
			</section>
		);
	}

	return (
		<section className='py-10'>
			<div className='container mx-auto px-4'>
				<h2 className='text-2xl font-bold mb-6'>Related Products</h2>
				{loading && <p>Loading related products...</p>}
				{!loading && products.length === 0 && <p>No related products found.</p>}
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
					{products.map((product) => (
						<Product key={product._id} product={product} />
					))}
				</div>
			</div>
		</section>
	);
}
