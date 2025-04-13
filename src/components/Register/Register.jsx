/** @format */
import React from "react";
import classes from "./Register.module.css";
import { FloatingLabel, Button, Alert } from "flowbite-react";
import { useFormik } from "formik";
import { HiInformationCircle } from "react-icons/hi";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

export default function Register() {
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [isLoadeing, setLoading] = useState(false);

	const initialValues = {
		name: "",
		email: "",
		phone: "",
		password: "",
		rePassword: "",
	};

	const validationSchema = Yup.object().shape({
		// Name Validation
		name: Yup.string()
			.min(3, "Name must be at least 3 characters")
			.required("Name is required"),
		// Email Validation
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is required"),
		// Phone Validation
		phone: Yup.string()
			.matches(/^\d+$/, "Phone number must contain only digits")
			.matches(
				/^(010|011|012|015)\d{8}$/,
				"Invalid Egyptian phone number (e.g., 01012345678)"
			)
			.required("Phone number is required"),
		// Password Validation
		password: Yup.string()
			.min(8, "Password must be at least 8 characters")
			.matches(/[A-Z]/, "Password must contain at least one uppercase letter")
			.matches(/[a-z]/, "Password must contain at least one lowercase letter")
			.matches(/[0-9]/, "Password must contain at least one number")
			.matches(
				/[@$!%*?&]/,
				"Password must contain at least one special character (@, $, !, %, *, ?, &)"
			)
			.required("Password is required"),
		rePassword: Yup.string()
			.oneOf([Yup.ref("password")], "Passwords must match")
			.required("Please confirm your password"),
	});

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			setLoading(true);
			try {
				const response = await axios.post(
					"https://ecommerce.routemisr.com/api/v1/auth/signup",
					values
				);
				setError(null);
				console.log("Success:", response.data);
				navigate("/login"); // Redirect to login page
			} catch (error) {
				console.error("Error:", error.response?.data || error.message);
				setError(error.response?.data?.message || "Something went wrong");
			} finally {
				setLoading(false);
			}
		},
	});

	return (
		<>
			{" "}
			<Helmet>
				<title>Register</title>
				<meta name='description' content='Welcome to our online store' />
			</Helmet>
			;
			<section className={`${classes.Register}`}>
				<div className='container mx-auto px-4'>
					<div className='space-y-4 max-w-lg mx-auto py-20'>
						<h2 className='text-4xl font-bold mb-6'>Register</h2>
						{error && (
							<Alert
								color='failure'
								icon={HiInformationCircle}
								className='mb-3'>
								{error}
							</Alert>
						)}
						<form onSubmit={formik.handleSubmit}>
							{/* Full Name Field */}
							<FloatingLabel
								variant='outlined'
								label='Full Name'
								type='text'
								name='name'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.name}
							/>
							{formik.touched.name && formik.errors.name && (
								<Alert
									color='failure'
									icon={HiInformationCircle}
									className='mb-3'>
									{formik.errors.name}
								</Alert>
							)}

							{/* Email Field */}
							<FloatingLabel
								variant='outlined'
								label='Email'
								type='email'
								name='email'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.email}
							/>
							{formik.touched.email && formik.errors.email && (
								<Alert
									color='failure'
									icon={HiInformationCircle}
									className='mb-3'>
									{formik.errors.email}
								</Alert>
							)}

							{/* Phone Field */}
							<FloatingLabel
								variant='outlined'
								label='Phone'
								type='tel'
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

							{/* Password Field */}
							<FloatingLabel
								variant='outlined'
								label='Password'
								type='password'
								name='password'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.password}
							/>
							{formik.touched.password && formik.errors.password && (
								<Alert
									color='failure'
									icon={HiInformationCircle}
									className='mb-3'>
									{formik.errors.password}
								</Alert>
							)}

							{/* Re-Password Field */}
							<FloatingLabel
								variant='outlined'
								label='Re-Password'
								type='password'
								name='rePassword'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.rePassword}
							/>
							{formik.touched.rePassword && formik.errors.rePassword && (
								<Alert
									color='failure'
									icon={HiInformationCircle}
									className='mb-3'>
									{formik.errors.rePassword}
								</Alert>
							)}

							{/* Submit Button */}
							<Button
								color='blue'
								className='mt-5'
								type='submit'
								disabled={!(formik.isValid && formik.dirty) || isLoadeing}>
								{isLoadeing ? (
									<i className='fa fa-spinner' fa-spin></i>
								) : (
									"Register"
								)}
							</Button>
						</form>
					</div>
				</div>
			</section>
		</>
	);
}
