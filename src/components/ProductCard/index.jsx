import { Link } from "react-router-dom";
import Star from '../../assets/star.png'
import "./index.css";

const ProductCard = (props) => {
  const { productData } = props;
  const { title, brand, imageUrl, rating, price, id } = productData;

  return (
    <li className="product-item">
      <Link to={`/products/${id}`} className="link-item">
        <img
          src={`https://ecomreactapi.onrender.com/uploads/${imageUrl}`}
          alt="product"
          className="thumbnail"
        />
        <div className="product-details">
          <p className="price">Rs {price}/-</p>
          <div className="rating-container">
            <p className="rating">{rating}</p>
            <img
              src={Star}
              alt="star"
              className="star"
            />
          </div>
        </div>
        <h1 className="title">{title}</h1>
        <p className="brand">by {brand}</p>
      </Link>
    </li>
  );
};

export default ProductCard;
