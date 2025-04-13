/** @format */

import React, { useState } from "react";
import classes from "./Loader.module.css";
export default function Loader() {
    
	return (
		<>
			<section className={`${classes.Loader}`}>
				<div className='container mx-auto px-3'>
					<h2>Loader</h2>
				</div>
			</section>
		</>
	);
}
