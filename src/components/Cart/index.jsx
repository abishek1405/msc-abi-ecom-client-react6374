import {useEffect, useState} from 'react'
import { useContext } from "react";
import Cookies from 'js-cookie'
import Header from '../Header'
import CartListView from '../CartListView'
import Cartsummary from '../CartSummary'
import EmptyCartView from '../EmptyCartView'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => {
  const { cartList, setCartList, removeAllCartItems } = useContext(CartContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCart = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const response = await fetch('https://ecomreactapi.onrender.com/cart', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setCartList(data.items)
      }
      setIsLoading(false)
    }

    fetchCart()
  }, [])

  
  if (isLoading) {
    return (
      <>
        <Header />
        <p className="loading-text">Loading cart...</p>
      </>
    )
  }

  const showEmptyView = cartList.length === 0

  return (
    <>
      <Header />
      <div className="cart-container">
        {showEmptyView ? (
          <EmptyCartView />
        ) : (
          <div className="cart-content-container">
            <h1 className="cart-heading">My Cart</h1>

            <div className="allremove">
              <button
                className="removeAlllink"
                type="button"
                data-testid="remove-all"
                onClick={removeAllCartItems}
              >
                Remove All
              </button>
            </div>

            <CartListView
              cartList={cartList}
              setCartList={setCartList}
            />
            <Cartsummary cartList={cartList} removeAllCartItems={removeAllCartItems} />
          </div>
        )}
      </div>
    </>
  )
}

export default Cart
