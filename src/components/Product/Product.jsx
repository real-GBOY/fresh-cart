/** @format */

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Product.module.css";
import { CartContext } from "../../Context/CartContext"; // Ensure correct path
import { toast } from "react-toastify";

export default function Product({ product }) {
	const { addToCart } = useContext(CartContext); // Fixed context usage
	const navigate = useNavigate();

	// Navigate to product details page
	const handleProductClick = () => {
		navigate(`/product-details/${product._id}/${product.category.name}`);
	};

	// Function to add product to cart
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
		<section className={classes.Product}>
			<div className='container mx-auto px-3'>
				<div
					className='bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition duration-300 cursor-pointer'
					onClick={handleProductClick}>
					<img
						src={product.imageCover}
						alt={product.title}
						className='w-full h-32 object-cover rounded-md'
					/>
					<span className='text-sm text-gray-500 mt-2 block'>
						{product.category.name}
					</span>
					<h2 className='text-lg font-semibold text-gray-800 mt-2 truncate'>
						{product.title}
					</h2>
					<div className='flex justify-between items-center mt-3'>
						<span className='text-lg font-bold text-teal-600'>
							{product.price} EGP
						</span>
						<div className='flex items-center text-yellow-400'>
							<i className='fa fa-star'></i>
							<span className='text-sm text-gray-600 ml-1'>
								{product.ratingsAverage}
							</span>
						</div>
					</div>
					<button
						className='mt-3 w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition'
						onClick={addProductToCart}>
						Add to Cart
					</button>
				</div>
			</div>
		</section>
	);
}
