'use client';

import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Header from "../Header";
import "./index.css";
import Cookie from "js-cookie";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = Cookie.get("jwt_token");
        const response = await fetch("https://ecomreactapi.onrender.com/orders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Unable to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return (
      <>
        <Header />
        <div className="loader-container">
          <ClipLoader size={50} color="#0f9d58" />
        </div>
      </>
    );

  return (
    <>
      <Header />
      <main className="orders-main">
        <div className="orders-wrapper">
          <div className="orders-header">
            <div className="header-content">
              <h1 className="orders-title">My Orders</h1>
              <p className="orders-subtitle">
                Track and manage all your purchases
              </p>
            </div>
            <div className="orders-stats">
              <div className="stat-card">
                <span className="stat-label">Total Orders</span>
                <span className="stat-value">{orders.length}</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="error-banner">
              <span className="error-icon">⚠️</span>
              <span className="error-message">{error}</span>
            </div>
          )}

          {orders.length === 0 && !error ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h2>No Orders Yet</h2>
              <p>You haven't placed any orders. Start shopping to see them here!</p>
            </div>
          ) : (
            <div className="orders-grid">
              {orders.map((order) => (
                <div key={order._id} className="order-card">
                  <div className="order-card-header">
                    <div className="order-info">
                      <h3 className="order-id">Order #{order.orderId}</h3>
                      <p className="order-date">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <span
                      className={`status-badge status-${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="order-divider"></div>

                  <div className="order-items">
                    <h4 className="items-title">Items</h4>
                    <ul className="items-list">
                      {order.items.map((item, index) => (
                        <li key={index} className="item">
                          <div className="item-details">
                            <span className="item-name">{item.title}</span>
                            <span className="item-quantity">×{item.quantity}</span>
                          </div>
                          <span className="item-price">₹{item.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="order-divider"></div>

                  <div className="order-footer">
                    <div className="order-meta">
                      <div className="meta-item">
                        <span className="meta-label">Payment ID</span>
                        <span className="meta-value">{order.paymentId}</span>
                      </div>
                    </div>
                    <div className="order-total">
                      <span className="total-label">Total Amount</span>
                      <span className="total-amount">₹{order.totalAmount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Orders;
