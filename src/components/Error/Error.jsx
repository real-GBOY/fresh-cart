/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

export default function Error() {
	return (
		<>
			<Helmet>
				<title>Error | NestShop</title>
				<meta
					name='description'
					content='Oops! Something went wrong. Return to NestShop homepage.'
				/>
			</Helmet>

			<section className='min-h-screen flex items-center justify-center bg-white'>
				<div className='container mx-auto px-4'>
					<div className='max-w-3xl mx-auto text-center'>
						{/* Main Error Icon */}
						<div className='mb-12'>
							<div className='w-40 h-40 mx-auto bg-red-50 rounded-full flex items-center justify-center shadow-lg border border-red-100'>
								<AlertTriangle className='w-20 h-20 text-red-500' />
							</div>
						</div>

						{/* Error Message */}
						<div className='mb-12'>
							<h1 className='text-7xl md:text-8xl font-bold text-slate-900 mb-6 tracking-tight'>
								Oops!
							</h1>
							<h2 className='text-3xl md:text-4xl font-semibold text-slate-800 mb-6 leading-tight'>
								Something went
								<span className='text-red-500'> wrong</span>
							</h2>
							<p className='text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto'>
								We apologize for the inconvenience. Our team has been notified
								and is working to resolve this issue.
							</p>
						</div>

						{/* Action Buttons */}
						<div className='flex flex-col sm:flex-row gap-6 justify-center mb-16'>
							<Link
								to='/'
								className='inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-2xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg'>
								<Home className='w-6 h-6 mr-3' />
								Return Home
							</Link>

							<button
								onClick={() => window.location.reload()}
								className='inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-2xl text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-lg'>
								<RotateCcw className='w-6 h-6 mr-3' />
								Try Again
							</button>
						</div>

						{/* Status Message */}
						<div className='text-slate-500'>
							<span className='text-sm font-medium'>We're working on it</span>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
