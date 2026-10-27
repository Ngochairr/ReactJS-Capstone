import React from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import logo from "../assets/Cybersoftlogo.png";
import "./Header.css";
export default function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  return (
    <header className="site-header">
      {/* Black header */}
      <div className="top-header">
        <div className="header-logo">
          <Link to="/search">
            <img src={logo} alt="Logo"/>
          </Link>
        </div>

        <div className="header-actions">
          <Link to="/search" className="header-search">
            <i className="bi bi-search"></i>
            <span>Search</span>
          </Link>

          <Link to="/cart" className="header-cart">
            <i className="bi bi-cart"></i>
            <span>1</span>
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="header-auth-link">
                Profile
              </Link>
              <button
                className="header-auth-link header-logout"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="header-auth-link">
                Login
              </Link>
              <Link to="/register" className="header-auth-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

    <nav className="category-nav">
      <div className="nav-links">
        <Link
          to="/search"
          className={!category ? "active" : ""}
        >
          Home
        </Link>

        <Link
          to="/search?category=men"
          className={category === "men" ? "active" : ""}
        >
          Men
        </Link>

        <Link
          to="/search?category=women"
          className={category === "women" ? "active" : ""}
        >
          Woman
        </Link>

        <Link
          to="/search?category=kid"
          className={category === "kid" ? "active" : ""}
        >
          Kid
        </Link>

        <Link
          to="/search?category=sport"
          className={category === "sport" ? "active" : ""}
        >
          Sport
        </Link>
      </div>
    </nav>
    </header>
  );
}