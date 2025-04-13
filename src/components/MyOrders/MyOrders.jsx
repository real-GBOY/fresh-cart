/** @format */

import React, { useEffect } from "react";
import styles from "./MyOrders.module.css";
import payment from "../../assets/payment.png";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate("/");
		}, 5000);

		// Cleanup function to clear the timeout if the component unmounts
		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<div className='container mx-auto max-w-lg'>
			<div className='bg-white rounded-lg shadow-lg p-8 my-10 text-center flex flex-col items-center'>
				<div className='mb-6 relative'>
					<img
						className='w-48 h-auto object-contain'
						src={payment}
						alt='Payment successful'
					/>
					<div className='absolute -bottom-4 right-0 bg-green-500 rounded-full p-1'>
						<CheckCircle className='text-white' size={24} />
					</div>
				</div>

				<h2 className='text-2xl font-bold text-gray-800 mb-3'>
					Payment Successful!
				</h2>

				<div className='w-16 h-1 bg-green-500 rounded-full mb-4'></div>

				<p className='text-gray-600 mb-6 max-w-sm'>
					Thank you for your payment. An automated receipt has been sent to your
					registered email.
				</p>

				<div className='flex flex-col gap-3 w-full max-w-xs'>
					<Link to='/' className='w-full'>
						<button className='w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg'>
							Return to Home
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
