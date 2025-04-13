/** @format */

import React, { useState } from "react";
import classes from "./Products.module.css";
import { Helmet } from "react-helmet-async";

export default function Products() {
	return (
		<>
			{" "}
			<Helmet>
				<title>Products</title>
				<meta name='description' content='Welcome to our online store' />
			</Helmet>
			<section className={`${classes.Products}`}>
				<div className='container mx-auto px-3'>
					<h2>Products</h2>
				</div>
			</section>
		</>
	);
}
