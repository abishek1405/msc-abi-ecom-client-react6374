import { useLocation } from 'react-router-dom'
import { useEffect, useState } from "react";
import "./index.css";

/* ─── Icons (inline SVGs so no external deps needed) ─── */

const HashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="9" x2="20" y2="9" />
    <line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" />
    <line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);

const CreditCardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const PackageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16.5 9.4l-9-5.19" />
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/* ─── Confetti Component ─── */

function Confetti() {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const colors = ["#22c55e", "#16a34a", "#4ade80", "#86efac", "#f59e0b", "#3b82f6", "#ec4899", "#a855f7"];
    const generated = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.8,
      duration: 2 + Math.random() * 2,
      size: 6 + Math.random() * 8,
      rotation: Math.random() * 360,
    }));
    setPieces(generated);
  }, []);

  if (pieces.length === 0) return null;

  return (
    <div className="confetti-container" aria-hidden="true">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.x}%`,
            top: "-10px",
            width: `${piece.size}px`,
            height: `${piece.size * 0.6}px`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animated Checkmark ─── */

function AnimatedCheckmark() {
  return (
    <div className="checkmark-wrapper">
      <div className="checkmark-ping" />
      <div className="checkmark-pulse" />
      <div className="checkmark-circle">
        <svg className="checkmark-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            className="checkmark-path"
            d="M5 13l4 4L19 7"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

/* ─── Main Order Confirmation ─── */

export default function OrderConfirmation() {
  const [showConfetti, setShowConfetti] = useState(false);
  const location = useLocation()
  const { orderId, amount } = location.state || {}

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="page">
      {/* Background effects */}
      <div className="bg-blur bg-blur--tl" />
      <div className="bg-blur bg-blur--br" />
      <div className="bg-shimmer" />

      {/* Confetti */}
      {showConfetti && <Confetti />}

      {/* Content */}
      <div className="content">

        {/* Animated Checkmark */}
        <AnimatedCheckmark />

        {/* Title */}
        <div className="title-section">
          <h1>Payment Successful!</h1>
          <p>Thank you for your purchase. Your order has been placed and is being processed.</p>
        </div>

        {/* Order Details Card */}
        <div className="order-card">
          <div className="order-card-header">
            <p>Order Details</p>
          </div>

          <div className="order-row">
            <div className="order-icon"><HashIcon /></div>
            <div className="order-info">
              <p className="order-label">Order ID</p>
              <p className="order-value order-value--mono">{orderId}</p>
            </div>
          </div>

          <div className="order-row">
            <div className="order-icon"><CreditCardIcon /></div>
            <div className="order-info">
              <p className="order-label">Total Paid</p>
              <p className="order-value order-value--large">Rs {amount}/-</p>
            </div>
          </div>

          <div className="order-row">
            <div className="order-icon"><PackageIcon /></div>
            <div className="order-info">
              <p className="order-label">Status</p>
              <div className="status-row">
                <span className="status-dot">
                  <span className="status-dot-ping" />
                  <span className="status-dot-solid" />
                </span>
                <span className="status-text">Confirmed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Shopping Button */}
        <a href="/" className="cta-button">
          Continue Shopping
          <ArrowRightIcon />
        </a>

        {/* Trust Badges */}
        <div className="badges">
          <div className="badge">
            <div className="badge-icon"><ShieldIcon /></div>
            <span>Secure</span>
          </div>
          <div className="badge-divider" />
          <div className="badge">
            <div className="badge-icon"><TruckIcon /></div>
            <span>Fast Delivery</span>
          </div>
          <div className="badge-divider" />
          <div className="badge">
            <div className="badge-icon"><ClockIcon /></div>
            <span>24/7 Support</span>
          </div>
        </div>

        {/* Footer */}
        <p className="footer-note">
          A confirmation email has been sent to your registered email address.
        </p>
      </div>
    </main>
  );
}
