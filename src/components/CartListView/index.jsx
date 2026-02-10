import CartItem from '../CartItem'

import './index.css'

const CartListView = ({cartList, setCartList}) => {
  return (
    <ul className="cart-list">
      {cartList.map(eachCartItem => (
        <CartItem
          key={eachCartItem.productId}
          cartItemDetails={eachCartItem}
          setCartList={setCartList}
        />
      ))}
  </ul>
  )
}

export default CartListView
