/** @format */

import { createContext, useState, useEffect } from "react";
import * as jwtDecode from "jwt-decode";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
	const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
	const [id, setId] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setAuthToken(token);

			const decoded = jwtDecode.jwtDecode(token);

			setId(decoded.id);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ authToken, setAuthToken, id }}>
			{children}
		</AuthContext.Provider>
	);
}
