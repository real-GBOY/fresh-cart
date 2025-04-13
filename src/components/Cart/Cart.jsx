/** @format */
import React, { useContext, useEffect, useState } from "react";
import classes from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";
import { Helmet } from "react-helmet-async";

export default function Cart() {
	const {
		numOfCartItems,
		cartDetails,
		loading: contextLoading,
		getCart,
		updateCartItemQuantity,
		removeFromCart,
		clearCart,
	} = useContext(CartContext);
	const { authToken } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);

	async function getCartDetails() {
		try {
			setLoading(true);
			await getCart();
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}

	useEffect(() => {
		if (authToken) {
			getCartDetails();
		}
	}, [authToken]);

	// Loading skeleton component
	const CartSkeleton = () => (
		<div className='animate-pulse'>
			<div className='h-8 w-48 bg-gray-200 rounded mb-6'></div>
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg mb-4'>
				<div className='h-12 bg-gray-200 rounded-t mb-1'></div>
				{[1, 2, 3].map((item) => (
					<div
						key={item}
						className='flex p-4 bg-gray-100 mb-1 rounded items-center'>
						<div className='h-24 w-24 bg-gray-200 rounded mr-6'></div>
						<div className='flex-1'>
							<div className='h-5 bg-gray-200 rounded w-2/3 mb-4'></div>
							<div className='flex items-center'>
								<div className='h-8 w-24 bg-gray-200 rounded mr-6'></div>
								<div className='h-6 w-16 bg-gray-200 rounded mr-6'></div>
								<div className='h-5 w-24 bg-gray-200 rounded'></div>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className='h-24 bg-gray-200 rounded'></div>
		</div>
	);

	return (
		<>
			{" "}
			<Helmet>
				<title>Cart</title>
				<meta name='description' content='Welcome to our online store' />
			</Helmet>
			;
			<section className={`${classes.Cart} py-5`}>
				<div className='container mx-auto px-3'>
					<h2 className='text-2xl font-bold mb-4'>Shopping Cart</h2>

					{loading || contextLoading ? (
						<CartSkeleton />
					) : cartDetails &&
					  cartDetails.products &&
					  cartDetails.products.length > 0 ? (
						<>
							<div className='relative overflow-x-auto shadow-md sm:rounded-lg mb-4'>
								<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
									<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
										<tr>
											<th scope='col' className='px-16 py-3'>
												<span className='sr-only'>Image</span>
											</th>
											<th scope='col' className='px-6 py-3'>
												Product
											</th>
											<th scope='col' className='px-6 py-3'>
												Qty
											</th>
											<th scope='col' className='px-6 py-3'>
												Price
											</th>
											<th scope='col' className='px-6 py-3'>
												Action
											</th>
										</tr>
									</thead>
									<tbody>
										{cartDetails.products.map((product) => (
											<tr
												key={product.product._id}
												className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'>
												<td className='p-4'>
													<img
														src={product.product.imageCover}
														className='w-16 md:w-32 max-w-full max-h-full'
														alt={product.product.title}
														onError={(e) => {
															e.target.onerror = null;
															e.target.src = "/placeholder-image.png"; // Fallback image
														}}
													/>
												</td>
												<td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
													{product.product.title}
												</td>
												<td className='px-6 py-4'>
													<div className='flex items-center'>
														<button
															className='inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
															type='button'
															onClick={() =>
																updateCartItemQuantity(
																	product.product._id,
																	product.count - 1
																)
															}
															disabled={product.count <= 1}>
															<span className='sr-only'>Decrease quantity</span>
															<svg
																className='w-3 h-3'
																aria-hidden='true'
																xmlns='http://www.w3.org/2000/svg'
																fill='none'
																viewBox='0 0 18 2'>
																<path
																	stroke='currentColor'
																	strokeLinecap='round'
																	strokeLinejoin='round'
																	strokeWidth='2'
																	d='M1 1h16'
																/>
															</svg>
														</button>
														<div>
															<input
																type='number'
																id={`product_${product.product._id}`}
																className='bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
																value={product.count}
																readOnly
															/>
														</div>
														<button
															className='inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
															type='button'
															onClick={() =>
																updateCartItemQuantity(
																	product.product._id,
																	product.count + 1
																)
															}>
															<span className='sr-only'>Increase quantity</span>
															<svg
																className='w-3 h-3'
																aria-hidden='true'
																xmlns='http://www.w3.org/2000/svg'
																fill='none'
																viewBox='0 0 18 18'>
																<path
																	stroke='currentColor'
																	strokeLinecap='round'
																	strokeLinejoin='round'
																	strokeWidth='2'
																	d='M9 1v16M1 9h16'
																/>
															</svg>
														</button>
													</div>
												</td>
												<td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
													${product.price}
												</td>
												<td className='px-6 py-4'>
													<button
														onClick={() => removeFromCart(product.product._id)}
														className='font-medium text-red-600 dark:text-red-500 hover:underline'>
														Remove
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							<div className='bg-white p-4 rounded-lg shadow-md dark:bg-gray-800'>
								<div className='flex justify-between mb-2'>
									<span className='font-semibold'>Total Price:</span>
									<span className='font-bold'>
										${cartDetails.totalCartPrice}
									</span>
								</div>
								<div className='flex justify-between'>
									<button
										onClick={clearCart}
										className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition'>
										Clear Cart
									</button>
									<button
										onClick={() => (window.location.href = "/checkout")}
										className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition'>
										Checkout
									</button>
								</div>
							</div>
						</>
					) : (
						<div className='text-center py-10'>
							<h3 className='text-xl mb-2'>Your cart is empty</h3>
							<p className='mb-4'>
								Add some products to your cart to see them here.
							</p>
							<button
								onClick={() => (window.location.href = "/")}
								className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'>
								Continue Shopping
							</button>
						</div>
					)}
				</div>
			</section>
		</>
	);
}
