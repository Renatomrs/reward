import React from 'react';

import { Link } from 'react-router-dom'

import "./styles.css"

const Header = ({ children }) => {
  return (
    <header>
      <dir className="header-container">
        <Link to={"/"}>
          <span className='logo'>
            Reward
          </span>
        </Link>
      
        <nav>
          {children}
        </nav>
      </dir>
    </header>
  )
}

export default Header
