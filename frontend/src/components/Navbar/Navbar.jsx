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
            <img src={user?.avatar || 'https://i.imgur.com/6VBx3io.png'} alt="Profile" />
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
