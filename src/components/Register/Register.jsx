/** @format */
import React, { useState } from "react";
import {
	Eye,
	EyeOff,
	User,
	Mail,
	Phone,
	Lock,
	CheckCircle,
	XCircle,
	Loader2,
	ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";

export default function RegisterForm() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		rePassword: "",
	});

	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});
	const [showPassword, setShowPassword] = useState(false);
	const [showRePassword, setShowRePassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [submitError, setSubmitError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);

	const validateField = (name, value) => {
		switch (name) {
			case "name":
				if (!value.trim()) return "Name is required";
				if (value.trim().length < 3)
					return "Name must be at least 3 characters";
				return "";

			case "email":
				if (!value) return "Email is required";
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(value))
					return "Please enter a valid email address";
				return "";

			case "phone":
				if (!value) return "Phone number is required";
				const phoneRegex = /^(010|011|012|015)\d{8}$/;
				if (!phoneRegex.test(value))
					return "Please enter a valid Egyptian phone number (e.g., 01012345678)";
				return "";

			case "password":
				if (!value) return "Password is required";
				if (value.length < 8) return "Password must be at least 8 characters";
				if (!/[A-Z]/.test(value))
					return "Password must contain at least one uppercase letter";
				if (!/[a-z]/.test(value))
					return "Password must contain at least one lowercase letter";
				if (!/[0-9]/.test(value))
					return "Password must contain at least one number";
				if (!/[@$!%*?&]/.test(value))
					return "Password must contain at least one special character (@$!%*?&)";
				return "";

			case "rePassword":
				if (!value) return "Please confirm your password";
				if (value !== formData.password) return "Passwords do not match";
				return "";

			default:
				return "";
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Real-time validation
		const error = validateField(name, value);
		setErrors((prev) => ({ ...prev, [name]: error }));

		// If password changes, revalidate rePassword
		if (name === "password" && formData.rePassword) {
			const rePasswordError = validateField("rePassword", formData.rePassword);
			setErrors((prev) => ({ ...prev, rePassword: rePasswordError }));
		}
	};

	const handleBlur = (e) => {
		const { name } = e.target;
		setTouched((prev) => ({ ...prev, [name]: true }));
	};

	const getPasswordStrength = (password) => {
		let strength = 0;
		if (password.length >= 8) strength++;
		if (/[A-Z]/.test(password)) strength++;
		if (/[a-z]/.test(password)) strength++;
		if (/[0-9]/.test(password)) strength++;
		if (/[@$!%*?&]/.test(password)) strength++;

		if (strength === 0) return { strength: 0, label: "", color: "" };
		if (strength <= 2) return { strength, label: "Weak", color: "bg-red-500" };
		if (strength <= 4)
			return { strength, label: "Medium", color: "bg-yellow-500" };
		return { strength, label: "Strong", color: "bg-green-500" };
	};

	const passwordStrength = getPasswordStrength(formData.password);

	const isFormValid = () => {
		const allFieldsValid = Object.values(errors).every((error) => !error);
		const allFieldsFilled = Object.values(formData).every(
			(value) => value.trim() !== ""
		);
		return allFieldsValid && allFieldsFilled;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setSubmitError(null);

		// Validate all fields
		const newErrors = {};
		Object.keys(formData).forEach((key) => {
			const error = validateField(key, formData[key]);
			if (error) newErrors[key] = error;
		});

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			setTouched(
				Object.keys(formData).reduce(
					(acc, key) => ({ ...acc, [key]: true }),
					{}
				)
			);
			setIsLoading(false);
			return;
		}

		try {
			const response = await axios.post(
				"https://ecommerce.routemisr.com/api/v1/auth/signup",
				formData
			);
			setIsSuccess(true);
			console.log("Registration successful:", response.data);
		} catch (error) {
			setSubmitError(
				error.response?.data?.message ||
					"Registration failed. Please try again."
			);
		} finally {
			setIsLoading(false);
		}
	};

	if (isSuccess) {
		return (
			<>
				<Helmet>
					<title>Registration Successful | NestShop</title>
					<meta
						name='description'
						content='Your account has been created successfully'
					/>
				</Helmet>
				<div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4'>
					<div className='max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100'>
						<div className='w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6'>
							<CheckCircle className='w-8 h-8 text-green-500' />
						</div>
						<h2 className='text-2xl font-bold text-slate-900 mb-4 text-center'>
							Registration Successful!
						</h2>
						<p className='text-slate-600 mb-8 text-center'>
							Your account has been created successfully. You can now log in to
							your account.
						</p>
						<button
							onClick={() => navigate("/login")}
							className='w-full bg-blue-600 text-white py-3.5 px-4 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 group'>
							<span>Continue to Login</span>
							<ArrowRight className='w-5 h-5 transform group-hover:translate-x-1 transition-transform' />
						</button>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<Helmet>
				<title>Create Account | NestShop</title>
				<meta name='description' content='Create your NestShop account' />
			</Helmet>
			<div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4 py-12'>
				<div className='max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100'>
					<div className='text-center mb-8'>
						<h1 className='text-3xl font-bold text-slate-900 mb-2'>
							Create Account
						</h1>
						<p className='text-slate-600'>Join us today and get started</p>
					</div>

					{submitError && (
						<div className='mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3'>
							<XCircle className='w-5 h-5 text-red-500 mt-0.5 flex-shrink-0' />
							<p className='text-red-600 text-sm'>{submitError}</p>
						</div>
					)}

					<form onSubmit={handleSubmit} className='space-y-6'>
						{/* Name Field */}
						<div className='space-y-2'>
							<label
								htmlFor='name'
								className='block text-sm font-medium text-slate-700'>
								Full Name
							</label>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<User className='h-5 w-5 text-slate-400' />
								</div>
								<input
									id='name'
									type='text'
									name='name'
									value={formData.name}
									onChange={handleInputChange}
									onBlur={handleBlur}
									placeholder='Enter your full name'
									className={`block w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200 ${
										touched.name && errors.name
											? "border-red-300"
											: "border-slate-200"
									}`}
								/>
							</div>
							{touched.name && errors.name && (
								<p className='text-sm text-red-600 flex items-center gap-1.5'>
									<XCircle className='w-4 h-4' />
									<span>{errors.name}</span>
								</p>
							)}
						</div>

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
									type='email'
									name='email'
									value={formData.email}
									onChange={handleInputChange}
									onBlur={handleBlur}
									placeholder='Enter your email'
									className={`block w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200 ${
										touched.email && errors.email
											? "border-red-300"
											: "border-slate-200"
									}`}
								/>
							</div>
							{touched.email && errors.email && (
								<p className='text-sm text-red-600 flex items-center gap-1.5'>
									<XCircle className='w-4 h-4' />
									<span>{errors.email}</span>
								</p>
							)}
						</div>

						{/* Phone Field */}
						<div className='space-y-2'>
							<label
								htmlFor='phone'
								className='block text-sm font-medium text-slate-700'>
								Phone Number
							</label>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Phone className='h-5 w-5 text-slate-400' />
								</div>
								<input
									id='phone'
									type='tel'
									name='phone'
									value={formData.phone}
									onChange={handleInputChange}
									onBlur={handleBlur}
									placeholder='Enter your phone number'
									className={`block w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200 ${
										touched.phone && errors.phone
											? "border-red-300"
											: "border-slate-200"
									}`}
								/>
							</div>
							{touched.phone && errors.phone && (
								<p className='text-sm text-red-600 flex items-center gap-1.5'>
									<XCircle className='w-4 h-4' />
									<span>{errors.phone}</span>
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
									type={showPassword ? "text" : "password"}
									name='password'
									value={formData.password}
									onChange={handleInputChange}
									onBlur={handleBlur}
									placeholder='Create a password'
									className={`block w-full pl-10 pr-12 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200 ${
										touched.password && errors.password
											? "border-red-300"
											: "border-slate-200"
									}`}
								/>
								<button
									type='button'
									onClick={() => setShowPassword(!showPassword)}
									className='absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-200'>
									{showPassword ? (
										<EyeOff className='h-5 w-5' />
									) : (
										<Eye className='h-5 w-5' />
									)}
								</button>
							</div>

							{formData.password && (
								<div className='space-y-2'>
									<div className='flex justify-between items-center'>
										<span className='text-sm text-slate-600'>
											Password strength:
										</span>
										<span
											className={`text-sm font-medium ${
												passwordStrength.strength <= 2
													? "text-red-600"
													: passwordStrength.strength <= 4
													? "text-yellow-600"
													: "text-green-600"
											}`}>
											{passwordStrength.label}
										</span>
									</div>
									<div className='w-full bg-slate-100 rounded-full h-1.5'>
										<div
											className={`h-1.5 rounded-full transition-all duration-300 ${passwordStrength.color}`}
											style={{
												width: `${(passwordStrength.strength / 5) * 100}%`,
											}}
										/>
									</div>
								</div>
							)}

							{touched.password && errors.password && (
								<p className='text-sm text-red-600 flex items-center gap-1.5'>
									<XCircle className='w-4 h-4' />
									<span>{errors.password}</span>
								</p>
							)}
						</div>

						{/* Confirm Password Field */}
						<div className='space-y-2'>
							<label
								htmlFor='rePassword'
								className='block text-sm font-medium text-slate-700'>
								Confirm Password
							</label>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-slate-400' />
								</div>
								<input
									id='rePassword'
									type={showRePassword ? "text" : "password"}
									name='rePassword'
									value={formData.rePassword}
									onChange={handleInputChange}
									onBlur={handleBlur}
									placeholder='Confirm your password'
									className={`block w-full pl-10 pr-12 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200 ${
										touched.rePassword && errors.rePassword
											? "border-red-300"
											: "border-slate-200"
									}`}
								/>
								<button
									type='button'
									onClick={() => setShowRePassword(!showRePassword)}
									className='absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-200'>
									{showRePassword ? (
										<EyeOff className='h-5 w-5' />
									) : (
										<Eye className='h-5 w-5' />
									)}
								</button>
							</div>
							{touched.rePassword && errors.rePassword && (
								<p className='text-sm text-red-600 flex items-center gap-1.5'>
									<XCircle className='w-4 h-4' />
									<span>{errors.rePassword}</span>
								</p>
							)}
						</div>

						{/* Submit Button */}
						<button
							type='submit'
							disabled={!isFormValid() || isLoading}
							className={`w-full py-3.5 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
								isFormValid() && !isLoading
									? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-200"
									: "bg-slate-100 text-slate-400 cursor-not-allowed"
							}`}>
							{isLoading ? (
								<>
									<Loader2 className='w-5 h-5 animate-spin' />
									<span>Creating Account...</span>
								</>
							) : (
								<span>Create Account</span>
							)}
						</button>
					</form>

					<div className='mt-8 text-center'>
						<p className='text-slate-600 text-sm'>
							Already have an account?{" "}
							<button
								onClick={() => navigate("/login")}
								className='text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200'>
								Sign in here
							</button>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
