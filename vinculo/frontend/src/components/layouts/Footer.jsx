import React, { useState } from "react";
import "../cssfiles/footerDesktop.css";
import paytmIcon from "../footer images/paytm.svg";
import gpayIcon from "../footer images/google-pay.svg";
import phonepeIcon from "../footer images/phonepe.svg";
import codIcon from "../footer images/cod.svg";
import amzIcon from "../footer images/amazon-pay.svg";
import facebook from "../footer images/facebook.svg";
import whatsapp from "../footer images/whatsapp.svg";
import twitter from "../footer images/twitter.svg";
import instagram from "../footer images/instagram.svg";

import "./footer.css";

import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaShoppingBasket,
  FaShoppingCart,
} from "react-icons/fa";
import { TbCategoryPlus } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="desktop-footer">
        <div className="footer-container">
          <div className="footer-links">
            <h3>COMPANY</h3>
            <div className="company-columns">
              <div className="company-column">
                <ul>
                  <li>
                    <a href="#">Search</a>
                  </li>
                  <li>
                    <a href="#">Return/Exchange Policy</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Terms & Conditions</a>
                  </li>
                  <li>
                    <a href="#">Stores</a>
                  </li>
                </ul>
              </div>
              <div className="company-column">
                <ul>
                  <li>
                    <a href="#">Terms of Service</a>
                  </li>
                  <li>
                    <a href="#">Refund policy</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Track Order</a>
                  </li>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-about">
            <h3>About Us</h3>
            <div className="about-us">
              <p style={{ textAlign: "justify" }}>
                In our company we are selling first quality t-shirts for both
                men and women.
              </p>
            </div>
            <div className="footer-contact">
              <h3>Contact us</h3>
              <p>123 Street Name, City, Country</p>
              <p>Phone: +1234567890</p>
              <div className="footer-social">
                <a href="https://instagram.com">
                  <img src={instagram} alt="Instagram" />
                </a>
                <a href="https://whatsapp.com">
                  <img src={whatsapp} alt="WhatsApp" />
                </a>
                <a href="https://facebook.com">
                  <img src={facebook} alt="Facebook" />
                </a>
                <a href="https://twitter.com">
                  <img src={twitter} alt="Twitter" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="secure-payment-app">
          <div className="secure-payment-text">100% Secure Payment</div>
          <div className="payment-icons">
            <img src={paytmIcon} alt="Paytm" />
            <img src={gpayIcon} alt="GPay" />
            <img src={phonepeIcon} alt="PhonePe" />
            <img src={amzIcon} alt="Amazon Pay" />
            <img src={codIcon} alt="Cash on Delivery" />
          </div>
        </div>

        <div className="copyright">
          <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        </div>
      </div>

      <div className="mobile-footer">
        <ul className="navigation">
          <li>
            <Link to="/">
              <FaHome style={{ color: "#2a292b" }} /> <div></div>
            </Link>
          </li>



          <li>
            <Link to="/orders">
              <FaShoppingCart style={{ color: "#2a292b" }} /> 
            </Link>
          </li>

          <li>
            <Link to="/cart">
              <FaShoppingBasket style={{ color: "#2a292b" }} /> 
            </Link>
          </li>

          <li>
            <Link to="/myprofile">
              <FaUser style={{ color: "#2a292b" }} /> 
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
