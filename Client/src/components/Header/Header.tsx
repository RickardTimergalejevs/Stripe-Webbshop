import "./Header.css"
import { Link } from "react-router-dom"
import { IoCartSharp } from "react-icons/io5"
import { FaUserCircle } from "react-icons/fa"
import LoginPopup from "../LoginPopup/LoginPopup"
import { useUserContext } from "../../context/UserContext"
import { useState } from "react"

const Header = () => {
  const { user, logout } = useUserContext()
  const [loginPopupOpen, setLoginPopupOpen] = useState(false)


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
        <div className="header-login" onClick={toggleLoginPopup}>
          {!user ? <FaUserCircle onClick={toggleLoginPopup} /> : <p>Hi, {user.username}!</p> }
          {user ? <p onClick={handleClick}>Logout</p> : <p>Login</p>}
        </div>
        <div className="header-cart">
        <Link to={"/cart"}>
          <IoCartSharp />
        </Link>
          <p>Cart</p>
        </div>
      </div>
    </header>
  )
}

export default Header