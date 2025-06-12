/** @format */
import React from "react";
import { useFormik } from "formik";
import { HiInformationCircle } from "react-icons/hi";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext.jsx";
import { Helmet } from "react-helmet-async";
import { AlertTriangle, Mail, Lock, Loader2 } from "lucide-react";

export default function Login() {
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const { setAuthToken } = useContext(AuthContext);

	const initialValues = {
		email: "",
		password: "",
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is required"),
		password: Yup.string().required("Password is required"),
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
				localStorage.setItem("token", response.data.token);
				setAuthToken(response.data.token);
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
			<Helmet>
				<title>Login | NestShop</title>
				<meta name='description' content='Login to your NestShop account' />
			</Helmet>

			<section className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4'>
				<div className='w-full max-w-md'>
					{/* Card Container */}
					<div className='bg-white rounded-2xl shadow-xl p-8 border border-slate-100'>
						{/* Header */}
						<div className='text-center mb-8'>
							<h1 className='text-3xl font-bold text-slate-900 mb-2'>
								Welcome Back
							</h1>
							<p className='text-slate-600'>Please sign in to your account</p>
						</div>

						{/* Error Alert */}
						{error && (
							<div className='mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3'>
								<AlertTriangle className='w-5 h-5 text-red-500 mt-0.5 flex-shrink-0' />
								<p className='text-sm text-red-600'>{error}</p>
							</div>
						)}

						{/* Login Form */}
						<form onSubmit={formik.handleSubmit} className='space-y-6'>
							{/* Email Field */}
							<div className='space-y-2'>
								<label
									htmlFor='email'
									className='block text-sm font-medium text-slate-700'>
									Email Address
								</label>
								<div className='relative'>
									<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
										<Mail className='h-5 w-5 text-slate-400' />
									</div>
									<input
										id='email'
										name='email'
										type='email'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.email}
										className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
											formik.touched.email && formik.errors.email
												? "border-red-300"
												: "border-slate-200"
										}`}
										placeholder='Enter your email'
									/>
								</div>
								{formik.touched.email && formik.errors.email && (
									<p className='text-sm text-red-600 mt-1'>
										{formik.errors.email}
									</p>
								)}
							</div>

							{/* Password Field */}
							<div className='space-y-2'>
								<label
									htmlFor='password'
									className='block text-sm font-medium text-slate-700'>
									Password
								</label>
								<div className='relative'>
									<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
										<Lock className='h-5 w-5 text-slate-400' />
									</div>
									<input
										id='password'
										name='password'
										type='password'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.password}
										className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
											formik.touched.password && formik.errors.password
												? "border-red-300"
												: "border-slate-200"
										}`}
										placeholder='Enter your password'
									/>
								</div>
								{formik.touched.password && formik.errors.password && (
									<p className='text-sm text-red-600 mt-1'>
										{formik.errors.password}
									</p>
								)}
							</div>

							{/* Submit Button */}
							<button
								type='submit'
								disabled={
									!formik.values.email || !formik.values.password || isLoading
								}
								className={`w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${
									(!formik.values.email ||
										!formik.values.password ||
										isLoading) &&
									"opacity-50 cursor-not-allowed"
								}`}>
								{isLoading ? (
									<>
										<Loader2 className='w-5 h-5 mr-2 animate-spin' />
										Signing in...
									</>
								) : (
									"Sign in"
								)}
							</button>
						</form>

						{/* Footer */}
						<div className='mt-6 text-center'>
							<p className='text-sm text-slate-600'>
								Don't have an account?{" "}
								<button
									onClick={() => navigate("/register")}
									className='font-medium text-blue-600 hover:text-blue-500'>
									Sign up
								</button>
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
