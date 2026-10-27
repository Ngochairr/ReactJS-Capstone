import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-4 footer-column">
              <h5>GET HELP</h5>
              <ul>
                <li><Link to="/search">Home</Link></li>
                <li><a href="#nike">Nike</a></li>
                <li><a href="#adidas">Adidas</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="col-12 col-md-4 footer-column">
              <h5>ORDERS</h5>
              <ul>
                <li><a href="#payment">Payment</a></li>
                <li><a href="#shipping">Shipping</a></li>
                <li><a href="#returns">Returns</a></li>
                <li><a href="#faqs">FAQs</a></li>
              </ul>
            </div>

            <div className="col-12 col-md-4 footer-column">
              <h5>REGISTER</h5>
              <ul>
                <li><Link to="/register">Create an account</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/profile">My profile</Link></li>
                <li><a href="#support">Support</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2022 Cybersoft All Rights Reserved | Design Theme by Trương Tấn Khải.
        </p>
      </div>
    </footer>
  );
}