/** @format */

import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext.jsx";
import { Navbar } from "flowbite-react";
import Logo from "../../../src/assets/freshcart-logo.svg";
import { CartContext } from "../../Context/CartContext.jsx";

export default function CustomNavbar() {
	const { authToken, setAuthToken } = useContext(AuthContext);
	const { numOfCartItems } = useContext(CartContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("authToken"); // Remove token from storage
		setAuthToken(null); // Clear auth state
		navigate("/login"); // Redirect to login page
	};

	return (
		<Navbar
			fluid
			rounded
			className='bg-gray-100 shadow-sm fixed top-0 w-full z-50'>
			<NavLink to='/'>
				<img src={Logo} className='mr-3 h-6 sm:h-9' alt='FreshCart Logo' />
			</NavLink>

			<Navbar.Toggle />
			<Navbar.Collapse>
				{/* Show only Login & Register when logged out */}
				{!authToken ? (
					<>
						<NavLink
							to='/login'
							className='px-3 py-2 font-bold'
							style={({ isActive }) => (isActive ? { color: "#155E75" } : {})}>
							Login
						</NavLink>
						<NavLink
							to='/register'
							className='px-3 py-2 font-bold'
							style={({ isActive }) => (isActive ? { color: "#155E75" } : {})}>
							Register
						</NavLink>
					</>
				) : (
					// Show everything else when logged in
					<>
						<NavLink
							to='/'
							className='px-3 py-2 font-bold'
							style={({ isActive }) =>
								isActive ? { color: "#155E75", fontWeight: "bold" } : {}
							}>
							Home
						</NavLink>
						{/* <NavLink
							to='/products'
							className='px-3 py-2 font-bold'
							style={({ isActive }) => (isActive ? { color: "#155E75" } : {})}>
							Products
						</NavLink> */}
						<NavLink
							to='/brands'
							className='px-3 py-2 font-bold'
							style={({ isActive }) => (isActive ? { color: "#155E75" } : {})}>
							Brands
						</NavLink>
						<NavLink
							to='/categories'
							className='px-3 py-2 font-bold'
							style={({ isActive }) => (isActive ? { color: "#155E75" } : {})}>
							Categories
						</NavLink>
						<NavLink
							to='/cart'
							className='px-3 py-2 font-bold relative'
							style={({ isActive }) => (isActive ? { color: "#155E75" } : {})}>
							Cart
							{numOfCartItems > 0 && (
								<span className='absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform bg-green-600 rounded-full'>
									{numOfCartItems}
								</span>
							)}
						</NavLink>
						<NavLink
							to='/profile'
							className='px-3 py-2 font-bold'
							style={({ isActive }) => (isActive ? { color: "#155E75" } : {})}>
							Profile
						</NavLink>
						<button
							onClick={handleLogout}
							className='px-3 py-2 font-bold text-red-600 hover:text-red-800'>
							Logout
						</button>
					</>
				)}
			</Navbar.Collapse>
		</Navbar>
	);
}
