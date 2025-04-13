/** @format */

import React from "react";
import classes from "./Home.module.css";
import { Button } from "flowbite-react";
import { Helmet } from "react-helmet-async";

export default function Home() {
	return (
		<>
			<Helmet>
				<title>Home Page</title>
				<meta name='description' content='Welcome to our online store' />
			</Helmet>
			<section className={`${classes.Home}`}>
				<div className='container mx-auto px-10'>
					{/* Your home page content here */}
				</div>
			</section>
		</>
	);
}
