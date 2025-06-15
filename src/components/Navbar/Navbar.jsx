/** @format */

import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext.jsx";
import { CartContext } from "../../Context/CartContext.jsx";

export default function CustomNavbar() {
	const { authToken, setAuthToken } = useContext(AuthContext);
	const { numOfCartItems } = useContext(CartContext);
	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	// Handle scroll effect
	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 10;
			setScrolled(isScrolled);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Close mobile menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (isMenuOpen && !event.target.closest(".navbar-container")) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, [isMenuOpen]);

	const handleLogout = () => {
		localStorage.removeItem("token");
		setAuthToken(null);
		navigate("/login");
		setIsMenuOpen(false); // Close mobile menu
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	const navLinkClasses = ({ isActive }) => `
		relative px-4 py-2 font-medium text-sm lg:text-base transition-all duration-300 rounded-xl
		${
			isActive
				? "text-white bg-gradient-to-r from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40"
				: "text-gray-700 hover:text-teal-600 hover:bg-white/60 backdrop-blur-sm"
		}
		before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-teal-500 before:to-cyan-500 
		before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-10
		${isActive ? "before:opacity-100" : ""}
		after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-teal-500 after:to-cyan-500
		after:transition-all after:duration-300
		${isActive ? "after:w-1/2" : "hover:after:w-1/2"}
	`;

	return (
		<nav
			className={`
			fixed top-0 w-full z-50 transition-all duration-500 navbar-container
			${
				scrolled
					? "bg-white/90 backdrop-blur-xl shadow-2xl border-b border-gray-200/30"
					: "bg-white/70 backdrop-blur-md shadow-lg border-b border-gray-200/20"
			}
		`}>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16 lg:h-20'>
					{/* Logo */}
					<NavLink
						to='/'
						className='flex items-center space-x-2 group'
						onClick={closeMenu}>
						<div className='w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105'>
							<span className='text-white font-bold text-lg lg:text-xl'>N</span>
						</div>
						<span className='text-xl lg:text-2xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 bg-clip-text text-transparent group-hover:from-teal-700 group-hover:via-cyan-700 group-hover:to-teal-800 transition-all duration-300'>
				ShopNest
						</span>
					</NavLink>

					{/* Desktop Navigation */}
					<div className='hidden lg:flex items-center space-x-2'>
						<NavLink to='/' className={navLinkClasses}>
							<span className='flex items-center space-x-2 relative z-10'>
								<svg
									className='w-4 h-4'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
									/>
								</svg>
								<span>Home</span>
							</span>
						</NavLink>

						<NavLink to='/brands' className={navLinkClasses}>
							<span className='flex items-center space-x-2 relative z-10'>
								<svg
									className='w-4 h-4'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
									/>
								</svg>
								<span>Brands</span>
							</span>
						</NavLink>

						<NavLink to='/categories' className={navLinkClasses}>
							<span className='flex items-center space-x-2 relative z-10'>
								<svg
									className='w-4 h-4'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
									/>
								</svg>
								<span>Categories</span>
							</span>
						</NavLink>

						{authToken ? (
							<>
								<NavLink to='/cart' className={navLinkClasses}>
									<span className='flex items-center space-x-2 relative z-10'>
										<div className='relative'>
											<svg
												className='w-4 h-4'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 004 16v2a1 1 0 001 1h16M7 13v4a1 1 0 001 1h8a1 1 0 001-1v-4'
												/>
											</svg>
											{numOfCartItems > 0 && (
												<span className='absolute -top-3 -right-3 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg animate-pulse'>
													{numOfCartItems > 99 ? "99+" : numOfCartItems}
												</span>
											)}
										</div>
										<span>Cart</span>
									</span>
								</NavLink>

								<NavLink to='/profile' className={navLinkClasses}>
									<span className='flex items-center space-x-2 relative z-10'>
										<svg
											className='w-4 h-4'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
											/>
										</svg>
										<span>Profile</span>
									</span>
								</NavLink>

								<button
									onClick={handleLogout}
									className='relative px-4 py-2 font-medium text-sm lg:text-base text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 rounded-xl shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105 flex items-center space-x-2'>
									<svg
										className='w-4 h-4'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
										/>
									</svg>
									<span>Logout</span>
								</button>
							</>
						) : (
							<div className='flex items-center space-x-2'>
								<NavLink to='/login' className={navLinkClasses}>
									<span className='flex items-center space-x-2 relative z-10'>
										<svg
											className='w-4 h-4'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
											/>
										</svg>
										<span>Login</span>
									</span>
								</NavLink>

								<NavLink
									to='/register'
									className='relative px-4 py-2 font-medium text-sm lg:text-base text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 rounded-xl shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-105 flex items-center space-x-2'>
									<svg
										className='w-4 h-4'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
										/>
									</svg>
									<span>Register</span>
								</NavLink>
							</div>
						)}
					</div>

					{/* Mobile menu button */}
					<button
						onClick={toggleMenu}
						className='lg:hidden relative w-10 h-10 rounded-xl bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center'
						aria-label='Toggle menu'>
						<div className='w-5 h-5 flex flex-col justify-center items-center'>
							<span
								className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${
									isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
								}`}></span>
							<span
								className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${
									isMenuOpen ? "opacity-0" : "opacity-100"
								}`}></span>
							<span
								className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${
									isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
								}`}></span>
						</div>
					</button>
				</div>

				{/* Mobile Navigation */}
				<div
					className={`
					lg:hidden transition-all duration-500 overflow-hidden
					${isMenuOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0 pb-0"}
				`}>
					<div className='bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 mt-4 p-4 space-y-2'>
						<NavLink
							to='/'
							className={`${navLinkClasses} w-full flex justify-start`}
							onClick={closeMenu}>
							<span className='flex items-center space-x-3'>
								<svg
									className='w-5 h-5'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
									/>
								</svg>
								<span>Home</span>
							</span>
						</NavLink>

						<NavLink
							to='/brands'
							className={`${navLinkClasses} w-full flex justify-start`}
							onClick={closeMenu}>
							<span className='flex items-center space-x-3'>
								<svg
									className='w-5 h-5'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
									/>
								</svg>
								<span>Brands</span>
							</span>
						</NavLink>

						<NavLink
							to='/categories'
							className={`${navLinkClasses} w-full flex justify-start`}
							onClick={closeMenu}>
							<span className='flex items-center space-x-3'>
								<svg
									className='w-5 h-5'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
									/>
								</svg>
								<span>Categories</span>
							</span>
						</NavLink>

						{authToken ? (
							<>
								<NavLink
									to='/cart'
									className={`${navLinkClasses} w-full flex justify-start`}
									onClick={closeMenu}>
									<span className='flex items-center space-x-3 relative'>
										<div className='relative'>
											<svg
												className='w-5 h-5'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 004 16v2a1 1 0 001 1h16M7 13v4a1 1 0 001 1h8a1 1 0 001-1v-4'
												/>
											</svg>
											{numOfCartItems > 0 && (
												<span className='absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg'>
													{numOfCartItems > 99 ? "99+" : numOfCartItems}
												</span>
											)}
										</div>
										<span>Cart</span>
									</span>
								</NavLink>

								<NavLink
									to='/profile'
									className={`${navLinkClasses} w-full flex justify-start`}
									onClick={closeMenu}>
									<span className='flex items-center space-x-3'>
										<svg
											className='w-5 h-5'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
											/>
										</svg>
										<span>Profile</span>
									</span>
								</NavLink>

								<button
									onClick={handleLogout}
									className='w-full px-4 py-3 font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 rounded-xl shadow-lg flex items-center justify-start space-x-3'>
									<svg
										className='w-5 h-5'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
										/>
									</svg>
									<span>Logout</span>
								</button>
							</>
						) : (
							<>
								<NavLink
									to='/login'
									className={`${navLinkClasses} w-full flex justify-start`}
									onClick={closeMenu}>
									<span className='flex items-center space-x-3'>
										<svg
											className='w-5 h-5'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
											/>
										</svg>
										<span>Login</span>
									</span>
								</NavLink>

								<button
									onClick={() => {
										navigate("/register");
										closeMenu();
									}}
									className='w-full px-4 py-3 font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 rounded-xl shadow-lg flex items-center justify-start space-x-3'>
									<svg
										className='w-5 h-5'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
										/>
									</svg>
									<span>Register</span>
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
