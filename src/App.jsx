/** @format */
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import { Offline, Online } from "react-detect-offline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Import components that are used in the router configuration
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AuthContextProvider from "./Context/AuthContext.jsx";
import CartContextProvider from "./Context/CartContext.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// Lazy load components
const Home = lazy(() => import("./components/Home/Home"));
const MainSlider = lazy(() => import("./components/MainSlider/MainSlider"));
const CategorySlider = lazy(() =>
	import("./components/CategorySlider/CategorySlider.jsx")
);
const RecentProducts = lazy(() =>
	import("./components/RecentProducts/RecentProducts")
);
const Brands = lazy(() => import("./components/Brands/Brands"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const Categories = lazy(() => import("./components/Categories/Categories"));
const Login = lazy(() => import("./components/Login/Login"));
const Products = lazy(() => import("./components/Products/Products"));
const Register = lazy(() => import("./components/Register/Register"));
const Error = lazy(() => import("./components/Error/Error"));
const Profile = lazy(() => import("./components/Profile/Profile"));
const ProductDetails = lazy(() =>
	import("./components/ProductDetails/ProductDetails")
);
const RelatedProducts = lazy(() =>
	import("./components/RelatedProducts/RelatedProducts.jsx")
);
const Checkout = lazy(() => import("./components/Checkout/Checkout"));
const MyOrders = lazy(() => import("./components/MyOrders/MyOrders"));

// Loading fallback component
const LoadingSpinner = () => (
	<div className='d-flex justify-content-center align-items-center vh-100'>
		<div className='spinner-border text-primary' role='status'>
			<span className='visually-hidden'>Loading...</span>
		</div>
	</div>
);

// Define Routes
const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: (
			<Suspense fallback={<LoadingSpinner />}>
				<Error />
			</Suspense>
		),
		children: [
			{
				index: true,
				element: (
					<Suspense fallback={<LoadingSpinner />}>
						<Home />
						<MainSlider />
						<CategorySlider />
						<RecentProducts />
					</Suspense>
				),
			},
			{
				path: "brands",
				element: (
					<Suspense fallback={<LoadingSpinner />}>
						<Brands />
					</Suspense>
				),
			},
			{
				path: "cart",
				element: (
					<ProtectedRoute>
						<Suspense fallback={<LoadingSpinner />}>
							<Cart />
						</Suspense>
					</ProtectedRoute>
				),
			},
			{
				path: "categories",
				element: (
					<Suspense fallback={<LoadingSpinner />}>
						<Categories />
					</Suspense>
				),
			},
			{
				path: "product-details/:id/:category",
				element: (
					<Suspense fallback={<LoadingSpinner />}>
						<ProductDetails />
					</Suspense>
				),
			},
			{
				path: "profile",
				element: (
					<Suspense fallback={<LoadingSpinner />}>
						<Profile />
					</Suspense>
				),
			},
			{
				path: "checkout",
				element: (
					<ProtectedRoute>
						<Suspense fallback={<LoadingSpinner />}>
							<Checkout />
						</Suspense>
					</ProtectedRoute>
				),
			},
			{
				path: "allorders",
				element: (
					<ProtectedRoute>
						<Suspense fallback={<LoadingSpinner />}>
							<MyOrders />
						</Suspense>
					</ProtectedRoute>
				),
			},
			// Public Routes
			{
				path: "login",
				element: (
					<Suspense fallback={<LoadingSpinner />}>
						<Login />
					</Suspense>
				),
			},
			{
				path: "register",
				element: (
					<Suspense fallback={<LoadingSpinner />}>
						<Register />
					</Suspense>
				),
			},
		],
	},
]);
const queryClient = new QueryClient();
function App() {
	return (
		<HelmetProvider>
			<AuthContextProvider>
				<QueryClientProvider client={new QueryClient()}>
					<CartContextProvider>
						<RouterProvider router={router} />
						<ToastContainer />
						<ReactQueryDevtools initialIsOpen={false} />
					</CartContextProvider>
				</QueryClientProvider>
			</AuthContextProvider>
		</HelmetProvider>
	);
}

export default App;
