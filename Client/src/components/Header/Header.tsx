import "./Header.css"
import { Link } from "react-router-dom"
import { IoCartSharp } from "react-icons/io5"
import { FaUserCircle } from "react-icons/fa"
import { RiProfileFill } from "react-icons/ri"
import LoginPopup from "../LoginPopup/LoginPopup"
import { useUserContext } from "../../context/UserContext"
import { useState } from "react"
import { ICartItem, useCartContext } from "../../context/CartContext"

const Header = () => {
  const { user, logout } = useUserContext()
  const { cartItems } = useCartContext()
  const [loginPopupOpen, setLoginPopupOpen] = useState(false)

  const totalQuantity = cartItems.reduce((total: number, item: ICartItem ) => total + item.quantity, 0);

  const handleClick = () => {
    logout()
  }

  const toggleLoginPopup = () => {
    setLoginPopupOpen(!loginPopupOpen);
  };

  return (
    <header>
      <Link to={"/"}>
        <h1 className="title">GYMSHOP</h1>
      </Link>
      {!user && loginPopupOpen && (
        <LoginPopup />
      )}
      <div className="header-icons">
      <div className="header-profile">
          {user && <Link to={"/profile"}>
          <RiProfileFill />
          <p>Profile</p>
          </Link>}
        </div>
        <div className="header-login" onClick={toggleLoginPopup}>
          {!user ? <FaUserCircle onClick={toggleLoginPopup} className="header-username" /> : <p className="header-username">{user.username}</p> }
          {user ? <p onClick={handleClick}>Logout</p> : <p>Login</p>}
        </div>
        <div className="header-cart">
        <Link to={"/cart"}>
          <IoCartSharp />
          <div className="cart-total-quantity">{totalQuantity}</div>
          <p>Cart</p>
        </Link>
        </div>
      </div>
    </header>
  )
}

export default Header