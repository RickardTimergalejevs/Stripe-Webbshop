import "./Header.css"
import { Link } from "react-router-dom"
import { IoCartSharp } from "react-icons/io5"
import { FaUserCircle } from "react-icons/fa"
import LoginPopup from "../LoginPopup/LoginPopup"
import { useUserContext } from "../../context/UserContext"

const Header = () => {
  const { user, logout } = useUserContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <Link to={"/"}>
        <h1 className="title">GYMSHOP</h1>
      </Link>
      <LoginPopup />
      <div className="header-icons">
        <div className="header-login">
          <FaUserCircle />
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