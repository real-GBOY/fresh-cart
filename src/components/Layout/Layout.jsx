/** @format */

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import CustomNavbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Offline, Online } from "react-detect-offline";

export default function Layout() {
	const [showOnlineMessage, setShowOnlineMessage] = useState(false);

	return (
		<div className='min-h-screen flex flex-col'>
			<CustomNavbar />
			<main className='flex-grow'>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
