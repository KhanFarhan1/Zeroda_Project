import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const handleProfileClick = () => {
    console.log("Profile clicked");
  };

  const [menuclick, setMenuclick] = useState(0);
  const [profile, setProfile] = useState(false);

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="public/assets/logo.png" style={{ width: "50px" }} alt="logo" />
      <div className="menus">
        <ul>
          <li>
            <Link
              to="/"
              onClick={() => {
                setMenuclick(0);
              }}
            >
              <p className={menuclick == 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              onClick={() => {
                setMenuclick(1);
              }}
            >
              <p className={menuclick == 1 ? activeMenuClass : menuClass}>
                Order
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/holdings"
              onClick={() => {
                setMenuclick(2);
              }}
            >
              <p className={menuclick == 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/positions"
              onClick={() => {
                setMenuclick(3);
              }}
            >
              <p className={menuclick == 3 ? activeMenuClass : menuClass}>
                Postion
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/funds"
              onClick={() => {
                setMenuclick(4);
              }}
            >
              <p className={menuclick == 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/apps"
              onClick={() => {
                setMenuclick(5);
              }}
            >
              <p className={menuclick == 5 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">ZU</div>
          <p className="username mt-3">USERID</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
