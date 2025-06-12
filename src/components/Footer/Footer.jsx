/** @format */

import React from "react";

export default function Footer() {
	return (
		<footer className='w-full py-8 bg-gradient-to-r from-slate-800 to-slate-900 text-white'>
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					{/* Brand Section */}
					<div className='space-y-4'>
						<h2 className='text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent'>
							NestShop
						</h2>
						<p className='text-gray-400 text-sm'>
							Your one-stop shop for all your needs. Quality products, great
							prices, and excellent service.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className='text-lg font-semibold mb-4 text-white'>
							Quick Links
						</h3>
						<ul className='space-y-2'>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'>
									Home
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'>
									Products
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'>
									Categories
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'>
									Brands
								</a>
							</li>
						</ul>
					</div>

					{/* Customer Service */}
					<div>
						<h3 className='text-lg font-semibold mb-4 text-white'>
							Customer Service
						</h3>
						<ul className='space-y-2'>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'>
									Contact Us
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'>
									FAQs
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'>
									Shipping Policy
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'>
									Returns & Refunds
								</a>
							</li>
						</ul>
					</div>

					{/* Newsletter */}
					<div>
						<h3 className='text-lg font-semibold mb-4 text-white'>
							Stay Updated
						</h3>
						<p className='text-gray-400 text-sm mb-4'>
							Subscribe to our newsletter for the latest updates and offers.
						</p>
						<form className='space-y-2'>
							<input
								type='email'
								placeholder='Enter your email'
								className='w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500'
							/>
							<button
								type='submit'
								className='w-full px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-300'>
								Subscribe
							</button>
						</form>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='mt-8 pt-8 border-t border-gray-700'>
					<div className='flex flex-col md:flex-row justify-between items-center'>
						<p className='text-gray-400 text-sm'>
							© 2025 NestShop. All rights reserved.
						</p>
						<div className='flex space-x-6 mt-4 md:mt-0'>
							<a
								href='#'
								className='text-gray-400 hover:text-white transition-colors'>
								Privacy Policy
							</a>
							<a
								href='#'
								className='text-gray-400 hover:text-white transition-colors'>
								Terms of Service
							</a>
							<a
								href='#'
								className='text-gray-400 hover:text-white transition-colors'>
								Contact Us
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
