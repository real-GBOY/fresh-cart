/** @format */

import React from "react";
import classes from "./Footer.module.css";

export default function Footer() {
	return (
		<footer
			className={`${classes.Footer} w-full py-4 text-center bg-slate-800 text-white fixed bottom-0 left-0`}>
			<div className='container mx-auto px-3'>
				<h2>GBOY MADE A MASTERPIECE</h2>
			</div>
		</footer>
	);
}
