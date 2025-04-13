/** @format */
import React from "react";
import classes from "./Checkout.module.css";
import { FloatingLabel, Button, Alert } from "flowbite-react";
import { useFormik } from "formik";
import { HiInformationCircle } from "react-icons/hi";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet-async";

export default function Checkout() {
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [isLoading, setLoading] = useState(false); // Fixed typo: isLoadeing → isLoading
	const { handlePayment } = useContext(CartContext);

	const initialValues = {
		details: "",
		phone: "",
		city: "",
	};

	async function onSubmit(values) {
		const res = await handlePayment(values);
		if (res.status === "success") {
			console.log("Payment Success");
			toast.success("Payment Success");

			setTimeout(() => {
				navigate("/allorders"); // Fixed typo: /order → /orders
			}, 2000);
		} else {
			toast.error("Payment Failed");
		}
	}

	const validationSchema = Yup.object().shape({
		// Details Validation
		details: Yup.string()
			.min(3, "Details must be at least 3 characters")
			.required("Details are required"),
		// Phone Validation
		phone: Yup.string()
			.matches(/^\d+$/, "Phone number must contain only digits")
			.matches(
				/^(010|011|012|015)\d{8}$/,
				"Invalid Egyptian phone number (e.g., 01012345678)"
			)
			.required("Phone number is required"),
		// City Validation
		city: Yup.string()
			.min(2, "City name must be at least 2 characters")
			.required("City is required"),
	});

	// In your formik setup, use the onSubmit function you defined
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			setLoading(true);
			try {
				await onSubmit(values);
			} catch (err) {
				setError(err.message || "Payment failed");
			} finally {
				setLoading(false);
			}
		},
	});

	return (
		<>
			<Helmet>
				CheckOut
				<meta name='description' content='Welcome to our online store' />
			</Helmet>
			<section className={`${classes.Checkout}`}>
				<div className='container mx-auto px-4'>
					<div className='space-y-4 max-w-lg mx-auto py-20'>
						<h2 className='text-4xl font-bold mb-6'>Checkout</h2>
						{error && (
							<Alert
								color='failure'
								icon={HiInformationCircle}
								className='mb-5'>
								{error}
							</Alert>
						)}
						<form onSubmit={formik.handleSubmit}>
							{/* Details Field */}
							<FloatingLabel
								variant='outlined'
								label='Address'
								type='text'
								name='details'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.details}
							/>
							{formik.touched.details && formik.errors.details && (
								<Alert
									color='failure'
									icon={HiInformationCircle}
									className='mb-3'>
									{formik.errors.details}
								</Alert>
							)}
							{/* City Field */}
							<FloatingLabel
								variant='outlined'
								type='text'
								label='City'
								name='city'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.city}
							/>
							{formik.touched.city && formik.errors.city && (
								<Alert
									color='failure'
									icon={HiInformationCircle}
									className='mb-3'>
									{formik.errors.city}
								</Alert>
							)}
							{/* Phone Field */}
							<FloatingLabel
								variant='outlined'
								type='tel'
								label='Phone'
								name='phone'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.phone}
							/>
							{formik.touched.phone && formik.errors.phone && (
								<Alert
									color='failure'
									icon={HiInformationCircle}
									className='mb-3'>
									{formik.errors.phone}
								</Alert>
							)}
							{/* Submit Button */}
							<Button
								className='w-full'
								type='submit'
								color='green'
								disabled={isLoading}>
								{isLoading ? "Processing..." : "Pay Now"}
							</Button>
						</form>
					</div>
				</div>
			</section>
		</>
	);
}
