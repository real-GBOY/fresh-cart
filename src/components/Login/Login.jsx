/** @format */
import React from "react";
import classes from "./Login.module.css";
import { FloatingLabel, Button, Alert } from "flowbite-react";
import { useFormik } from "formik";
import { HiInformationCircle } from "react-icons/hi";
import * as Yup from "yup";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext.jsx";
import { Helmet } from "react-helmet-async";

export default function Login() {
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [isLoadeing, setLoading] = useState(false);
	const { setAuthToken } = useContext(AuthContext);
	const initialValues = {
		email: "",
		password: "",
	};

	const validationSchema = Yup.object().shape({
		// Email Validation
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is required"),
		password: Yup.string().required("Password is required"),
		// 	.min(8, "Password must be at least 8 characters")
		// 	.matches(/[A-Z]/, "Password must contain at least one uppercase letter")
		// 	.matches(/[a-z]/, "Password must contain at least one lowercase letter")
		// 	.matches(/[0-9]/, "Password must contain at least one number")
		// 	.matches(
		// 		/[@$!%*?&]/,
		// 		"Password must contain at least one special character (@, $, !, %, *, ?, &)"
		// 	)
		// 	.required("Password is required"),
	});

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			setLoading(true);

			try {
				const response = await axios.post(
					"https://ecommerce.routemisr.com/api/v1/auth/signin",
					values
				);

				// ✅ Store token in localStorage
				localStorage.setItem("token", response.data.token);

				// ✅ Update AuthContext state
				setAuthToken(response.data.token);

				// ✅ Navigate to Home after login
				navigate("/");
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
				<title>Login</title>
				<meta name='description' content='Welcome to our online store' />
			</Helmet>
			;
			<section className={`${classes.Login}`}>
				<div className='container mx-auto px-4'>
					<div className='space-y-4 max-w-lg mx-auto py-20'>
						<h2 className='text-4xl font-bold mb-6'>Login</h2>
						{error && (
							<Alert
								color='failure'
								icon={HiInformationCircle}
								className='mb-3'>
								{error}
							</Alert>
						)}
						<form onSubmit={formik.handleSubmit}>
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
							{/* Submit Button */}
							<Button
								color='blue'
								className='mt-5'
								type='submit'
								disabled={
									!formik.values.email || !formik.values.password || isLoadeing
								}>
								{isLoadeing ? (
									<i className='fa fa-spinner fa-spin'></i>
								) : (
									"Login"
								)}
							</Button>
						</form>
					</div>
				</div>
			</section>
		</>
	);
}
