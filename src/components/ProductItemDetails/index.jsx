import {useState, useEffect, useContext} from 'react'
import {useParams, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import { ClipLoader } from "react-spinners";
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Star from '../../assets/star.png'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import CartContext from '../../context/CartContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const ProductItemDetails = () => {
  const {id} = useParams() 
  const [productData, setProductData] = useState({})
  const [similarProductsData, setSimilarProductsData] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [quantity, setQuantity] = useState(1)
  const { setCartList } = useContext(CartContext)


  useEffect(() => {
    const getProductData = async () => {
      setApiStatus(apiStatusConstants.inProgress)
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `https://ecomreactapi.onrender.com/products/${id}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const fetchedData = await response.json()
        setProductData(fetchedData.product)
        // setSimilarProductsData(updatedSimilarProductsData)
        setApiStatus(apiStatusConstants.success)
      } else if (response.status === 404) {
        setApiStatus(apiStatusConstants.failure)
      }
    }

    getProductData()
  }, [id])

  const onDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1)
    }
  }

  const onIncrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
  }

  const renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <ClipLoader color="blue" size={50} />  
    </div>
  )

  const renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  const renderProductDetailsView = () => {
    const {availability, brand, description, imageUrl, price, rating, title, totalReviews} = productData
    
    const onClickAddToCart = async () => {
      const jwtToken = Cookies.get('jwt_token')

      const cartItem = {
        productId: productData.id,
        title: productData.title,
        price: productData.price,
        imageUrl: productData.imageUrl,
        quantity,
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(cartItem),
      }

      const response = await fetch('https://ecomreactapi.onrender.com/cart', options)
      if (response.ok) { 
        setCartList(prevCartList => { 
          const itemExists = prevCartList.find(each => each.productId === cartItem.productId) 
          if (itemExists) { 
            return prevCartList.map(each => each.productId === cartItem.productId ? { ...each, quantity: each.quantity + quantity } : each ) } 
            return [...prevCartList, cartItem] 
          }) 
        }
    }


    return (
      <div className="product-details-success-view">
        <div className="product-details-container">
          <img src={`https://ecomreactapi.onrender.com/uploads/${imageUrl}`} alt="product" className="product-image" />
          <div className="product">
            <h1 className="product-name">{title}</h1>
            <p className="brand-name">by: {brand}</p>
            <p className="price-details">Rs {price}/-</p>
            <div className="rating-and-reviews-count">
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  src={Star}
                  alt="star"
                  className="star"
                />
              </div>
            <div className="reviews-count-container"><p className="reviews-count">{totalReviews}</p> Reviews</div>
            </div>
            
            <p className="product-description">{description}</p>
            <p className="product-availability">Available: {availability}</p>
              
            
            
            <hr className="horizontal-line" />
            <div className="quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onDecrementQuantity}
                data-testid="minus"
              >
                <BsDashSquare className="quantity-controller-icon" />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onIncrementQuantity}
                data-testid="plus"
              >
                <BsPlusSquare className="quantity-controller-icon" />
              </button>
            </div>
            <button
              type="button"
              className="button add-to-cart-btn"
              onClick={onClickAddToCart}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        {/* <h1 className="similar-products-heading-content">Similar Products</h1> */}
        <ul className="similar-products-list">
          {similarProductsData.map(eachSimilarProduct => (
            <SimilarProductItem
              productDetails={eachSimilarProduct}
              key={eachSimilarProduct.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  const renderProductDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductDetailsView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="product-item-details-container">
        {renderProductDetails()}
      </div>
    </>
  )
}

export default ProductItemDetails
