/** @format */

const ShoppingLoader = () => {
	return (
		<div className='creative-loader-container'>
			<div className='shopping-scene'>
				{/* Clouds */}
				<div className='cloud cloud-1'></div>
				<div className='cloud cloud-2'></div>
				<div className='cloud cloud-3'></div>

				{/* Shop */}
				<div className='shop'>
					<div className='shop-roof'></div>
					<div className='shop-body'>
						<div className='shop-window'></div>
						<div className='shop-door'></div>
					</div>
				</div>

				{/* Cart Character */}
				<div className='cart-character'>
					<div className='cart-body'>
						<div className='cart-face'>
							<div className='cart-eye cart-eye-left'></div>
							<div className='cart-eye cart-eye-right'></div>
							<div className='cart-smile'></div>
						</div>
					</div>
					<div className='cart-basket'>
						<div className='product product-1'>
							<div className='product-box'></div>
							<div className='product-tag'></div>
						</div>
						<div className='product product-2'>
							<div className='product-box'></div>
							<div className='product-tag'></div>
						</div>
						<div className='product product-3'>
							<div className='product-box'></div>
							<div className='product-tag'></div>
						</div>
					</div>
					<div className='cart-handle'></div>
					<div className='cart-wheel cart-wheel-left'></div>
					<div className='cart-wheel cart-wheel-right'></div>
				</div>

				{/* Road */}
				<div className='road'></div>
			</div>

			{/* Loader Text */}
			<div className='loader-text'>Loading</div>

			<style jsx>{`
				/* Your provided CSS styles go here */
			`}</style>
		</div>
	);
};

export default ShoppingLoader;
