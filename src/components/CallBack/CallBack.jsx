/** @format */

import React, { useCallback, useState } from "react";
import classes from "./CallBack.module.css";
import Child from "../Child/Child";
export default function CallBack() {
	const [search, setSearch] = useState(null);
	const [userName, setUserName] = useState("John Doe");
	const getSearchedValue = useCallback(() => {
		return search;
	}, [search]);
	return (
		<>
			<section className={`${classes.CallBack}`}>
				<div className='container mx-auto px-3'>
					<h2>CallBack</h2>
					<label
						for='default-search'
						className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
						Search
					</label>
					<div className='relative mb-4'>
						<div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
							<svg
								className='w-4 h-4 text-gray-500 dark:text-gray-400'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 20 20'>
								<path
									stroke='currentColor'
									strokeLinecap='round'
									stroke:inejoin='round'
									strokeWidth='2'
									d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
								/>
							</svg>
						</div>
						<input
							type='search'
							id='default-search'
							className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Search'
							onChange={(e) => setSearch(e.target.value)} // Uncomment this line
							required
						/>
						<button
							type='submit'
							className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
							Search
						</button>
					</div>
					<Child getSearchedValue={getSearchedValue} />
					<h2>After Chanaging :{userName} </h2>
					<button
						onClick={() => setUserName("hamada")}
						className='my-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition'>
						Chanage UserName
					</button>
				</div>
			</section>
		</>
	);
}
