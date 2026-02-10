import {Link} from 'react-router-dom'

const EmptyCartView = () => (
  <div className="empty-cart-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
      alt="empty cart"
      className="empty-cart-img"
    />
    <h1 className="empty-cart-heading">Your Cart is Empty</h1>
    <p className="empty-cart-description">
      Looks like you have not added anything to your cart. Go ahead and explore top categories.
    </p>
    <Link to="/products" className="shop-now-link">
      Shop Now
    </Link>
  </div>
)

export default EmptyCartView
