import { useEffect, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import MyOrders from './components/MyOrders'
import CartContext from './context/CartContext'
import OrderConfirmation from './components/OrderContext'
import './App.css'

const App = () => {
  const [cartList, setCartList] = useState([])
  const [orderList, setOrderList] = useState([])

  useEffect(() => {
    const jwtToken = Cookies.get('jwt_token')
    const fetchorderdetails = async () => {
      const response = await fetch('http://localhost:5000/orders', {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      const data = await response.json()
      setOrderList(data)
    }
    fetchorderdetails()
  }, [])

  const decrementCartItemQuantity = id => {
    setCartList(prevCartList => {
      const item = prevCartList.find(each => each.id === id)
      if (item.quantity === 1) {
        return prevCartList.filter(each => each.id !== id)
      }
      return prevCartList.map(each =>
        each.id === id ? { ...each, quantity: each.quantity - 1 } : each
      )
    })
  }

  const incrementCartItemQuantity = id => {
    setCartList(prevCartList =>
      prevCartList.map(each =>
        each.id === id ? { ...each, quantity: each.quantity + 1 } : each
      )
    )
  }

  const removeAllCartItems = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const response = await fetch('http://localhost:5000/cart', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    if (response.ok) {
      setCartList([])
    }
  }

  const removeCartItem = idd => {
    setCartList(prevCartList => prevCartList.filter(each => each.id !== idd))
  }

  const addCartItem = product => {
    setCartList(prevCartList => {
      const itemExists = prevCartList.find(each => each.id === product.id)
      if (itemExists) {
        return prevCartList.map(each =>
          each.id === product.id
            ? { ...each, quantity: each.quantity + product.quantity }
            : each
        )
      }
      return [...prevCartList, { ...product, quantity: 1 }]
    })
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        orderList,
        addCartItem,
        removeCartItem,
        removeAllCartItems,
        decrementCartItemQuantity,
        incrementCartItemQuantity,
        setCartList,
      }}
    >
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductItemDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myorders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </CartContext.Provider>
  )
}

export default App
