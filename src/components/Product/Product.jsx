/** @format */

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";

export default function Product({ product }) {
	const { addToCart } = useContext(CartContext);
	const navigate = useNavigate();

	const handleProductClick = () => {
		navigate(`/product-details/${product._id}/${product.category.name}`);
	};

	const addProductToCart = async (e) => {
		e.stopPropagation();

		try {
			const res = await addToCart(product._id);
			if (res.status === "success") {
				toast.success("Product added to cart");
			} else {
				toast.error("Failed to add product to cart");
			}
		} catch (error) {
			toast.error("Error adding product to cart");
			console.error(error);
		}
	};

	return (
		<div className='group relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1'>
			{/* Product Image Container */}
			<div
				className='relative aspect-w-1 aspect-h-1 w-full overflow-hidden cursor-pointer'
				onClick={handleProductClick}>
				<img
					src={product.imageCover}
					alt={product.title}
					className='w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110'
				/>
				{/* Category Badge */}
				<div className='absolute top-3 left-3'>
					<span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-teal-600 border border-teal-100'>
						{product.category.name}
					</span>
				</div>
				{/* Rating Badge */}
				<div className='absolute top-3 right-3'>
					<div className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-amber-500 border border-amber-100'>
						<svg
							className='w-3 h-3 mr-1'
							fill='currentColor'
							viewBox='0 0 20 20'>
							<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
						</svg>
						{product.ratingsAverage}
					</div>
				</div>
				{/* Hover Overlay */}
				<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
					<div className='absolute bottom-4 left-4 right-4'>
						<button
							onClick={addProductToCart}
							className='w-full bg-white text-teal-600 py-2.5 rounded-xl font-medium transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-teal-50'>
							Add to Cart
						</button>
					</div>
				</div>
			</div>

			<div className='p-4'>
				<h2 className='text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors duration-300'>
					{product.title}
				</h2>
				<div className='flex items-center justify-between'>
					<span className='text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent'>
						{product.price} EGP
					</span>
					<button
						onClick={addProductToCart}
						className='md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal-50 text-teal-600 hover:bg-teal-100 transition-colors duration-300'>
						<svg
							className='w-5 h-5'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M12 6v6m0 0v6m0-6h6m-6 0H6'
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}
