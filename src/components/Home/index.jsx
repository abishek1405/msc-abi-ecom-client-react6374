import Header from "../Header"
import { Link } from "react-router-dom";



import "./index.css"

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop"

const Home = () => (
  <>
  <Header />
  <div className="home-container">
    <div className="home-content">
      <h1 className="home-heading">Clothes That Get YOU Noticed</h1>
      <img
        src={HERO_IMAGE || "/placeholder.svg"}
        alt="clothes that get you noticed"
        className="home-mobile-img"
      />
      <p className="home-description">
        Fashion is part of the daily air and it does not quite help that it
        changes all the time. Clothes have always been a marker of the era and
        we are in a revolution. Your fashion makes you been seen and heard that
        way you are. So, celebrate the seasons new and exciting fashion in your
        own way.
      </p>
      <Link to="/products">
        <button type="button" className="shop-now-button">
          Shop Now
        </button>
      </Link>
    </div>
    <img
      src={HERO_IMAGE || "/placeholder.svg"}
      alt="clothes that get you noticed"
      className="home-desktop-img"
    />
  </div>
  </>
)

export default Home
