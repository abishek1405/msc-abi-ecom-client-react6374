import { Navigate } from 'react-router-dom'
import Cookie from 'js-cookie'

const ProtectedRoute = ({ children }) => {
  const token = Cookie.get('jwt_token')

  if (!token) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" replace />
  }

  // If token exists, render the protected component
  return children
}

export default ProtectedRoute
