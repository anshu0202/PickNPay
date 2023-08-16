import React from "react";
import { NavLink, Link } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi";

import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";

import useCategory from "../../hooks/useCategory";

import { useCart } from "../../context/cart";

const Header = () => {
  const [auth, setAuth] = useAuth();

  const categories=useCategory();

  const[cart]=useCart();  

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <HiShoppingBag /> PickNPay
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput/>
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
  <Link className="nav-link dropdown-toggle" to={"/categories"}    data-bs-toggle="dropdown">
    Categories
  </Link>
  
  <ul className="dropdown-menu">
  <Link className="dropdown-item" to={`/categories`}>
                        All Categories
                      </Link>
  {

    categories?.map(cat=>(

    <li >

                     
                      <Link className="dropdown-item" to={`/category/${cat.slug}`}>
                        {cat.name}
                      </Link>
                  </li>
    ))
  }
  </ul>
</li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
               <li className="nav-item dropdown">
  <NavLink className="nav-link dropdown-toggle"   role="button" data-bs-toggle="dropdown" aria-expanded="false">
    {auth?.user?.name}
  </NavLink>
  <ul className="dropdown-menu">
    <li><NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role===1?"admin":"user"}`}>Dashboard</NavLink></li>
    <li  onClick={handleLogout}>
                    <NavLink to="/login" className="dropdown-item">
                      Logout
                    </NavLink>
                  </li>
  </ul>
</li>     
                </>
              )}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  Cart({cart?.length})
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
