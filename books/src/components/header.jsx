import { Link,NavLink } from "react-router-dom"
import Logo from '../assets/react.svg'
function Header() {
  return (
    <header>
        <Link to='/' className="logo">
            <img src={Logo} alt="logo" />
        </Link>
        <nav>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/books'>Books</NavLink>
            <NavLink to='/about'>About</NavLink>
        </nav>
    </header>
  )
}

export default Header