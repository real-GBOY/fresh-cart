/** @format */

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import CustomNavbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Offline, Online } from "react-detect-offline";

export default function Layout() {
	const [showOnlineMessage, setShowOnlineMessage] = useState(false);

	useEffect(() => {
		const handleOnline = () => {
			setShowOnlineMessage(true);
			setTimeout(() => setShowOnlineMessage(false), 3000); // Hide after 3 seconds
		};

		window.addEventListener("online", handleOnline);
		return () => window.removeEventListener("online", handleOnline);
	}, []);

	return (
		<>
			<CustomNavbar />

			{/* Offline notification */}
			<Offline>
				<div className='fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg z-50'>
					You are currently offline. Some features may be limited.
				</div>
			</Offline>

			{/* Online notification (temporary) */}
			{showOnlineMessage && (
				<div className='fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50'>
					You are back online!
				</div>
			)}

			<Outlet />
			<Footer />
		</>
	);
}
