/** @format */

import React, { useEffect, useState } from "react";
import classes from "./Child.module.css";
export default function Child({ getSearchedValue }) {
	const [searchValue, setSearchValue] = useState(null);
	useEffect(() => {
		console.log("Child Component");
		setSearchValue(getSearchedValue());
	}, [getSearchedValue]);
	return (
		<>
			<section className={`${classes.Child}`}>
				<div className='container mx-auto px-3'>
					<h2>Search Value : {searchValue} </h2>
				</div>
			</section>
		</>
	);
}
