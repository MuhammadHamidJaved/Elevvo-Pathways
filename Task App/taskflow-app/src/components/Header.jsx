import React, { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-brand">
          <h2>TaskFlow</h2>
        </div>
        <div className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
          <a href="#features" className="nav-link">Features</a>
          <a href="#reviews" className="nav-link">Reviews</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        <button 
          className="nav-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  )
}

export default Header
