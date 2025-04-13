/** @format */

import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
	const token = localStorage.getItem("token");

	// Redirect to login if user is not authenticated
	if (!token) {
		return <Navigate to='/login' replace />;
	}

	return children;
}
