import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { DropdownButton, Dropdown, Image } from "react-bootstrap";
import { logout } from "../../actions/userActions";
import "./Header.css";

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout);
  };

  return (
    <nav
      className="navbar row"
      style={{ backgroundColor: "white", color: "black" }}
    >
      <div className="desktop-navbar">
        <div className="col-12 col-md-3 d-flex justify-content-between align-items-center left-side-navbar">
          <div className="navbar-brand d-flex align-items-center">
            <Link to="/">
              <img
                width="150px"
                height="50px"
                alt="vinculo"
                src="/images/Group22.svg"
                className="logo"
              />
            </Link>
          </div>
          <div className="ml-auto navigation-links">
            <Link to="/boys" className="mx-2 ">
              Boys
            </Link>
            <Link to="/girls" className="mx-2 ">
              Girls
            </Link>
            <Link to="/infant" className="mx-2 ">
              infant
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-3 mt-2 mt-md-0">
          <Search />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center profile-section">
          {isAuthenticated ? (
            <Dropdown className="d-inline">
              <Dropdown.Toggle
                variant="default text-white "
                id="dropdown-basic"
              >
                <figure className="avatar avatar-nav">
                  <Image
                    width="50px"
                    src={user.avatar ?? "./images/default_avatar.png"}
                  />
                </figure>
                <span className="username">{user.name}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {user.role === "admin" && (
                  <Dropdown.Item
                    onClick={() => {
                      navigate("admin/dashboard");
                    }}
                    className="text-dark"
                  >
                    Dashboard
                  </Dropdown.Item>
                )}
                <Dropdown.Item
                  onClick={() => {
                    navigate("/myprofile");
                  }}
                  className="text-dark"
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    navigate("/orders");
                  }}
                  className="text-dark"
                >
                  Orders
                </Dropdown.Item>
                <Dropdown.Item onClick={logoutHandler} className="text-danger">
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link to="/login" className="btn" id="login_btn">
              Login
            </Link>
          )}
          <Link to="/cart" className="btn" id="login_btn">
            <span className="ml-1" id="cart_count">
              {cartItems.length}
            </span> 
            <span id="cart" className="ml-3">
              Cart
            </span>
          </Link>

        </div>
      </div>

      <div className="mobile-navbar">
        <div className="col-12 col-md-3 d-flex justify-content-between align-items-center left-side-navbar">
          <div className="navbar-brand d-flex align-items-center">
            <Link to="/">
              <img
                width="150px"
                height="50px"
                alt="vinculo"
                src="/images/Group6.svg"
                className="logo"
              />
            </Link>
          </div>

          <div className="col-12 col-md-3 mt-2 mt-md-0">
            <Search />
          </div>
        </div>
      </div>
    </nav>
  );
}
