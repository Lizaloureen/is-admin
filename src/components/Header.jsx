import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/Header.css';

const Header = () => {
  return (
    <div className="navbar">
      <div className="nav-container container">
        <Link to='/' className="logo">Firearm Licencing</Link>
        <ul className="nav-list">
          <li className="nav-item"><Link to='/' className="nav-link">Home</Link></li>
          <li className="nav-item"><Link to='/vendors' className="nav-link">Vendors</Link> </li>
          <li className="nav-item"><Link to='/applications' className="nav-link">Applications</Link> </li>
          <li className="nav-item"><Link to='/clients' className="nav-link">Clients</Link> </li>
          <li className="nav-item"><Link to='/firearms' className="nav-link">Firearms</Link> </li>
          <li className="nav-item"><Link to='/login' className="nav-link">Login</Link> </li>
        </ul>
      </div>
    </div>
  )
}

export default Header