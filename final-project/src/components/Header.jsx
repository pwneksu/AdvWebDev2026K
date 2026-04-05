import React from 'react';

const Header = () => {
  return (
    <header className="wikipedia-header">
      <div className="header-left">
        <span className="menu-icon">☰</span>
        <div className="wikipedia-logo">
          <div className="logo-text">WIKIPEDIA</div>
          <div className="logo-sub">The Free Encyclopedia</div>
        </div>
      </div>
      <div className="header-search">
        <input type="text" placeholder="Search Wikipedia" />
      </div>
      <div className="header-right">
        <span className="user-links">Log in</span>
      </div>
    </header>
  );
};

export default Header;
