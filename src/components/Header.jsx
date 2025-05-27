import React from 'react'
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  return (
    <div id="header">Skintric<span>[intro]</span>
      {isLanding && (
        <div className="enter__code">
          <button className="enter__code-btn">Enter Code</button>
        </div>
      )}
    </div>
  )
}

export default Header