import React, { useContext, useRef, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { CounterContext } from '../../Context/CounterContext'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
import Wishlist from '../Wishlist/Wishlist'
import { WishlistContext } from '../../Context/WishlastContext'

export default function Navbar() {

  let { userData, setUserData } = useContext(UserContext);
  let navigate = useNavigate();
  let { cart } = useContext(CartContext);
  let { wishlists } = useContext(WishlistContext)

  function logOut() {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('login')
  }
  
  const [menuOpen, setMenuOpen] = useState(false);


  return <>
<nav className="bg-gray-200 fixed top-0 inset-x-0 py-2 px-5 capitalize z-50">
  <div className="container flex flex-col md:flex-row justify-between items-center text-gray-500">
    <div className="flex justify-between w-full md:w-auto">
      <img src={logo} width={120} alt="" />
      <div className="md:hidden cursor-pointer">
        <i className="fa-solid fa-bars text-main text-2xl" onClick={() => setMenuOpen(!menuOpen)}></i>
      </div>
    </div>
    <div className={`flex-col md:flex-row items-center space-x-3 w-full md:w-auto ${menuOpen ? 'flex' : 'hidden'} md:flex`}>
      {userData && (
        <ul className="flex-col md:flex md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <li><NavLink to="">Home</NavLink></li>
          <li><NavLink to="products">Products</NavLink></li>
          <li><NavLink to="categories">Categories</NavLink></li>
          <li><NavLink to="brands">Brands</NavLink></li>
        </ul>
      )}
      <ul className="flex-col md:flex md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        {userData ? (
          <>
            <li className="relative"><NavLink to="cart"><i className="fa-solid fa-cart-shopping text-gray-500 text-2xl text-main"></i> <span className="absolute left-1/2 top-0 text-black">{cart?.numOfCartItems}</span></NavLink></li>
            <li className="relative"><NavLink to="wishlist"><i className="fa-solid fa-heart text-gray-500 text-2xl text-main"></i> <span className="absolute left-1/2 top-0 text-black"></span></NavLink></li>
            <li onClick={logOut} className="mx-2 text-gray-500 cursor-pointer">Logout</li>
          </>
        ) : (
          <>
            <li><NavLink to="login">Login</NavLink></li>
            <li><NavLink to="register">Register</NavLink></li>
          </>
        )}
        <li className="flex space-x-2 text-black items-center">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-linkedin-in"></i>
          <i className="fab fa-youtube"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
        </li>
      </ul>
    </div>
  </div>
</nav>

  </>
}
