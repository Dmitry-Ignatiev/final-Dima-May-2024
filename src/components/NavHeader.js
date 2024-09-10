// src/components/NavHeader.js
import React from 'react';
import './NavHeader.css'; // Import your CSS file

const NavHeader = ({ onHomeClick, onCartClick, onAboutClick }) => {
    return (
        <header className="NavHeader">
            <div className="logo">
                <img src="/favicon.ico" alt="Logo" className="logo-img" />
            </div>
            <div className="site-title">לֵךְ לְךָ</div> {/* Site title next to the logo */}
            <nav className="nav-links">

                
                <ul className="nav-list">
                    <li className="nav-item">
                        <a href="/home" className="nav-link" onClick={onHomeClick}>Home</a>
                    </li>
                    <li className="nav-item"><a href="/about" className="nav-link" onClick={onAboutClick}>About</a></li>
                    <li className="nav-item"><a href="/cart" className="nav-link" onClick={onCartClick}>🛒</a></li>
            </ul>
               
            </nav>
        </header>
    );
};

export default NavHeader;
