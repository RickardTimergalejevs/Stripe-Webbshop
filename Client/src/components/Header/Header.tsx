import "./Header.css"
import { Link } from "react-router-dom"
import { IoCartSharp } from "react-icons/io5"
import { RiLoginBoxFill } from "react-icons/ri"

const Header = () => {
  return (
    <header>
      <Link to={"/"}>
        <h1 className="title">GYMSHOP</h1>
      </Link>
      <div className="header-icons">
        <RiLoginBoxFill />
        <Link to={"/cart"}>
          <IoCartSharp />
        </Link>
      </div>
    </header>
  )
}

export default Header