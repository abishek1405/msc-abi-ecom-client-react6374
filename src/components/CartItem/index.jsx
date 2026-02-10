import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'

import './index.css'

const CartItem = props => {
  const {cartItemDetails, setCartList} = props
  const {productId, title, brand, quantity, price, imageUrl} = cartItemDetails

  const jwtToken = Cookies.get('jwt_token')

  const updateCartFromServer = async () => {
    const response = await fetch('http://192.168.1.6:5000/cart', {
      headers: {Authorization: `Bearer ${jwtToken}`},
    })
    const data = await response.json()
    setCartList(data.items)
  }

  const onIncrementQuantity = async () => {
    await fetch(
      `http://192.168.1.6:5000/cart/increment/${productId}`,
      {
        method: 'PUT',
        headers: {Authorization: `Bearer ${jwtToken}`},
      }
    )
    updateCartFromServer()
  }

  const onDecrementQuantity = async () => {
    await fetch(
      `http://192.168.1.6:5000/cart/decrement/${productId}`,
      {
        method: 'PUT',
        headers: {Authorization: `Bearer ${jwtToken}`},
      }
    )
    updateCartFromServer()
  }

  const onRemoveCartItem = async () => {
    await fetch(
      `http://192.168.1.6:5000/cart/${productId}`,
      {
        method: 'DELETE',
        headers: {Authorization: `Bearer ${jwtToken}`},
      }
    )
    updateCartFromServer()
  }

  return (
    <li className="cart-item">
      <img
        className="cart-product-image"
        src={`http://192.168.1.6:5000/uploads/${imageUrl}`}
        alt={title}
      />

      <div className="cart-item-details-container">
        <div className="cart-product-title-brand-container">
          <p className="cart-product-title">{title}</p>
          <p className="cart-product-brand">by {brand}</p>
        </div>

        <div className="cart-quantity-container">
          <button
            type="button"
            data-testid="minus"
            onClick={onDecrementQuantity}
            className="quantity-controller-button"
          >
            <BsDashSquare color="#52606D" size={12} />
          </button>

          <p className="cart-quantity">{quantity}</p>

          <button
            type="button"
            data-testid="plus"
            onClick={onIncrementQuantity}
            className="quantity-controller-button"
          >
            <BsPlusSquare color="#52606D" size={12} />
          </button>
        </div>

        <div className="total-price-remove-container">
          <p className="cart-total-price">Rs {price * quantity}/-</p>
          <button
            className="remove-button"
            type="button"
            onClick={onRemoveCartItem}
          >
            Remove
          </button>
        </div>
      </div>

      <button
        className="delete-button"
        type="button"
        data-testid="remove"
        onClick={onRemoveCartItem}
      >
        <AiFillCloseCircle color="#616E7C" size={20} />
      </button>
    </li>
  )
}

export default CartItem
