import {Link} from 'react-router-dom'
import './index.css'

const SimilarProductItem = ({productDetails}) => {
  const {id, title, brand, imageUrl, rating, price} = productDetails

  return (
    <li className="similar-product-item">
      <Link to={`/products/${id}`} className="similar-product-link">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={`similar product ${title}`}
          className="similar-product-thumbnail"
        />
        <h1 className="similar-product-title">{title}</h1>
        <p className="similar-product-brand">by {brand}</p>
        <div className="similar-product-price-rating">
          <p className="similar-product-price">Rs {price}/-</p>
          <div className="similar-product-rating">
            <p className="similar-rating-value">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="similar-star"
            />
          </div>
        </div>
      </Link>
    </li>
  )
}

export default SimilarProductItem
