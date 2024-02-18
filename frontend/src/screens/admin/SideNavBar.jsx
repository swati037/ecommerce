import React, { useState } from "react";
import { FaUser, FaSignOutAlt, FaShoppingBag, FaClipboardList, FaUserCog } from 'react-icons/fa';
import '../../assests/styles/admin/SideNavBar.css';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetCart } from '../../slices/cartSlice';
import logo from '../../assests/logo.jpg';
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from 'react-router-dom';

const SideNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const [isExpanded, setExpendState] = useState(false);
  const menuItems = [
    { text: "Dashboard", icon: <MdSpaceDashboard />, to: "/admin/dashboard" },
    { text: "Orders", icon: <FaClipboardList />, to: "/admin/orderlist" },
    { text: "Products", icon: <FaShoppingBag />, to: "/admin/productlist" },
    { text: "Users", icon: <FaUser />, to: "/admin/userlist" },
    { text: "Admin Profile", icon: <FaUserCog />, to: "/admin/adminProfile" },
    {  },
    {  },
    { text: "Logout", icon: <FaSignOutAlt/> },
  ];

  return (
    <div
      className={
        isExpanded
          ? "side-nav-container"
          : "side-nav-container side-nav-container-NX"
      }
    >
      <div className="nav-upper">
        <div className="nav-heading">
          {isExpanded && (
            <div className="nav-brand">
              <img src={logo} alt='Shachi' style={{ height: '60px', width: '240px' }} />
            </div>
          )}
          <button
            className={
              isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
            } 
            onClick={() => setExpendState(!isExpanded)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        
        <div className="nav-menu">
          {menuItems.map(({ text, icon, to }, index) => (
            <Link
              key={index}
              to={to}
              className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
              onClick={text === "Logout" ? logoutHandler : undefined}
            >
              <span className="menu-item-icon">{icon}</span>
              {isExpanded && <p>{text}</p>}
            </Link>
          ))}
        </div>

        <div className="nav-footer">
          {isExpanded && (
            <div className="nav-details">
              <img
                className="nav-footer-avatar"
                src="icons/admin-avatar.svg"
                alt=""
                srcset=""
              />
            </div>
          )}
          <img className="logout-icon" src="icons/logout.svg" alt="" srcset="" />
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
