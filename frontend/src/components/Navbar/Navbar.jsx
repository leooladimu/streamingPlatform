import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  window.addEventListener('scroll', () => {
    setScrolled(window.scrollY > 50);
  });

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-left">
        <Link to="/" className="logo">
          ỌLEOFLIX
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/mylist">My List</Link>
        </div>
      </div>

      <div className="navbar-right">
        <div className="profile-menu">
          <button 
            className="profile-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <img 
              src={user?.avatar || 'https://occ-0-2430-2433.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41'} 
              alt="Profile" 
            />
            <span>▼</span>
          </button>
          {showProfileMenu && (
            <div className="profile-dropdown">
              <Link to="/profile" onClick={() => setShowProfileMenu(false)}>
                Profile
              </Link>
              <button onClick={logout}>Sign Out</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
