/** @format */

import React, { useState } from "react";
import classes from "./Profile.module.css";
export default function Profile() {
	return (
		<>
			{" "}
			<Helmet>
				<title>Profile</title>
				<meta name='description' content='Welcome to our online store' />
			</Helmet>
			;
			<section className={`${classes.Profile}`}>
				<div className='container mx-auto px-3'>
					<h2>Profile</h2>
				</div>
			</section>
		</>
	);
}
