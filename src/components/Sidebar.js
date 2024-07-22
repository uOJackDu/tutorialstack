// src/components/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBookOpen, FaHome, FaBook, FaCog } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <Link to="/" className="logo">
        <FaBookOpen /> <span>TutorialStack</span>
      </Link>
      <Link to="/" className={`sidebar-item ${location.pathname === '/' ? 'selected' : ''}`}>
        <FaHome /> <span>Home</span>
      </Link>
      <Link
        to="/browse"
        className={`sidebar-item ${location.pathname.startsWith('/browse')
          || location.pathname.startsWith('/community')
          || location.pathname.startsWith('/tutorial')
          ? 'selected' : ''
        }`}
      >
        <FaBook /> <span>Browse</span>
      </Link>
      <Link to="/settings" className={`sidebar-item ${location.pathname.startsWith('/settings') ? 'selected' : ''}`}>
        <FaCog /> <span>Settings</span>
      </Link>
    </div>
  );
};

export default Sidebar;
