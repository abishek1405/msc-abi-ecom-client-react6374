import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"

const CartSummary = ({ cartList, removeAllCartItems }) => {
  const navigate = useNavigate()   // ✅ hook at top

  const orderTotal = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )
  const totalItems = cartList.reduce((acc, item) => acc + item.quantity, 0)

  const loadRazorpay = async () => {
    const jwtToken = Cookies.get("jwt_token")

    try {
      // 1️⃣ Create order on backend
      const response = await fetch("http://192.168.1.6:5000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ amount: orderTotal }),
      })

      const order = await response.json()

      // 2️⃣ Razorpay options
      const options = {
        key: "rzp_test_SC64IiafZAX0uf",
        amount: order.amount,
        currency: "INR",
        name: "My Shop",
        description: "Cart Checkout",
        order_id: order.id,
        handler: async (response) => {
          // 3️⃣ Save order in backend
          const saveRes = await fetch("http://192.168.1.6:5000/save-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              cartList,
              totalAmount: orderTotal,
            }),
          })

          if (saveRes.ok) {
            // 4️⃣ Clear cart
            removeAllCartItems()
            // 5️⃣ Redirect with order details
            navigate('/order-confirmation', { state: { orderId: order.id, amount: orderTotal } })
          } else {
            alert("Payment done but order not saved ❌")
          }
        },
        theme: { color: "#3399cc" },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error(error)
      alert("Something went wrong ❌")
    }
  }

  return (
    <div className="cart-summary-container">
      <div className="cart-summary-top">
        <p className="summary-label">Order Total</p>
        <p className="order-total-value">Rs {orderTotal}/-</p>
        <p className="total-items">
          {totalItems} item{totalItems !== 1 ? "s" : ""} in cart
        </p>
      </div>
      <button type="button" className="checkout-btn" onClick={loadRazorpay}>
        Checkout
      </button>
    </div>
  )
}

export default CartSummary
