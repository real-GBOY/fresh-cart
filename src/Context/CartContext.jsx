/** @format */
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext(null);

export default function CartContextProvider({ children }) {
	const { authToken } = useContext(AuthContext);
	const [numOfCartItems, setNumOfCartItems] = useState(0);
	const [cartDetails, setCartDetails] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [cartId, setCartId] = useState(null);
	const [userId, setUserId] = useState(null);

	const headers = {
		token: authToken,
	};

	const apiURL = "https://ecommerce.routemisr.com/api/v1/cart";
	const ordersURL = "https://ecommerce.routemisr.com/api/v1/orders";
	const checkoutURL =
		"https://ecommerce.routemisr.com/api/v1/orders/checkout-session";

	
	useEffect(() => {
		if (authToken) {
			getCart();
		}
	}, [authToken]);

	async function addToCart(productId) {
		try {
			setLoading(true);
			setError(null);
			const response = await axios.post(
				apiURL,
				{
					productId,
				},
				{
					headers,
				}
			);
			if (response.data.status === "success") {
				setNumOfCartItems(response.data.numOfCartItems);
				// Update cart details as well to keep state consistent
				getCart();
			}
			setLoading(false);
			return response.data;
		} catch (error) {
			setLoading(false);
			setError(error.response?.data?.message || "Failed to add item to cart");
			console.log(error);
			return {
				status: "error",
				message: error.response?.data?.message || "Failed to add item to cart",
			};
		}
	}

	async function removeFromCart(productId) {
		try {
			setLoading(true);
			setError(null);
			const response = await axios.delete(`${apiURL}/${productId}`, {
				headers,
			});
			if (response.data.status === "success") {
				setNumOfCartItems(response.data.numOfCartItems);
				setCartDetails(response.data.data);
				setUserId(response.data.userId);
			}
			setLoading(false);
			return response.data;
		} catch (error) {
			setLoading(false);
			setError(
				error.response?.data?.message || "Failed to remove item from cart"
			);
			console.log(error);
			return {
				status: "error",
				message:
					error.response?.data?.message || "Failed to remove item from cart",
			};
		}
	}

	async function updateCartItemQuantity(productId, count) {
		try {
			setLoading(true);
			setError(null);
			const response = await axios.put(
				`${apiURL}/${productId}`,
				{
					count,
				},
				{
					headers,
				}
			);
			if (response.data.status === "success") {
				setNumOfCartItems(response.data.numOfCartItems);
				setCartDetails(response.data.data);
				setUserId(response.data.userId);
			}
			setLoading(false);
			return response.data;
		} catch (error) {
			setLoading(false);
			setError(
				error.response?.data?.message || "Failed to update item quantity"
			);
			console.log(error);
			return {
				status: "error",
				message:
					error.response?.data?.message || "Failed to update item quantity",
			};
		}
	}

	async function clearCart() {
		try {
			setLoading(true);
			setError(null);
			const response = await axios.delete(apiURL, { headers });
			if (response.data.status === "success") {
				setNumOfCartItems(0);
				setCartDetails(null);
				setCartId(null);
			}
			setLoading(false);
			return response.data;
		} catch (error) {
			setLoading(false);
			setError(error.response?.data?.message || "Failed to clear cart");
			console.log(error);
			return {
				status: "error",
				message: error.response?.data?.message || "Failed to clear cart",
			};
		}
	}

	async function handlePayment(shippingAddress) {
		try {
			setLoading(true);
			setError(null);

			const response = await axios.post(
				`${checkoutURL}/${cartId}`,
				{
					shippingAddress: {
						details: shippingAddress.details || "",
						phone: shippingAddress.phone || "",
						city: shippingAddress.city || "",
						postalCode: shippingAddress.postalCode || "",
					},
				},
				{
					headers,
					params: {
						url: window.location.origin, // Try without encodeURIComponent
					},
				}
			);

			setLoading(false);
			if (response.data.status === "success") {
				window.location.href = response.data.session.url;
			}
			return response.data;
		} catch (error) {
			setLoading(false);
			setError(error.response?.data?.message || "Failed to process payment");
			console.log(error);
			return {
				status: "error",
				message: error.response?.data?.message || "Failed to process payment",
			};
		}
	}

	async function getCart() {
		try {
			setLoading(true);
			setError(null);
			const response = await axios.get(apiURL, { headers });
			setLoading(false);
			if (response.data.status === "success") {
				setNumOfCartItems(response.data.numOfCartItems);
				setCartDetails(response.data.data);
				setUserId(response.data.userId);
				// Check if the data includes a cart ID
				if (response.data.data?._id) {
					setCartId(response.data.data._id);
				}
				return response.data;
			}
			return response.data;
		} catch (error) {
			setLoading(false);
			// If cart not found (e.g., new user), handle gracefully
			if (error.response?.status === 404) {
				setNumOfCartItems(0);
				setCartDetails(null);
				setCartId(null);
				return { status: "success", data: null, numOfCartItems: 0 };
			}
			setError(error.response?.data?.message || "Failed to fetch cart");
			console.log(error);
			return {
				status: "error",
				message: error.response?.data?.message || "Failed to fetch cart",
			};
		}
	}

	// Create order for cash on delivery
	async function createCashOrder(shippingAddress) {
		try {
			setLoading(true);
			setError(null);
			const response = await axios.post(
				`${ordersURL}`,
				{
					shippingAddress,
				},
				{
					headers,
				}
			);
			setLoading(false);
			if (response.data.status === "success") {
				// Clear cart after successful order
				await clearCart();
			}
			return response.data;
		} catch (error) {
			setLoading(false);
			setError(error.response?.data?.message || "Failed to create order");
			console.log(error);
			return {
				status: "error",
				message: error.response?.data?.message || "Failed to create order",
			};
		}
	}

	return (
		<CartContext.Provider
			value={{
				numOfCartItems,
				cartDetails,
				loading,
				error,
				cartId,
				addToCart,
				removeFromCart,
				updateCartItemQuantity,
				getCart,
				clearCart,
				handlePayment,
				createCashOrder,
				userId,
			}}>
			{children}
		</CartContext.Provider>
	);
}
