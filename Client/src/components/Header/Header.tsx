import "./Header.css"
import { Link } from "react-router-dom"
import { IoCartSharp } from "react-icons/io5"
import { FaUserCircle } from "react-icons/fa"
import LoginPopup from "../LoginPopup/LoginPopup"

const Header = () => {
  return (
    <header>
      <Link to={"/"}>
        <h1 className="title">GYMSHOP</h1>
      </Link>
      <LoginPopup />
      <div className="header-icons">
        <div className="header-login">
          <FaUserCircle />
          <p>Login</p>
        </div>
        <Link to={"/cart"}>
          <IoCartSharp />
        </Link>
      </div>
    </header>
  )
}

export default Header