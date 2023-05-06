import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <h1><Link to='/' className='link'>Books!</Link></h1>

      <ul>
        <li><Link to='/profile' className='link'>Authors</Link></li>
        <li><Link to='/register' className='link'>Register</Link></li>
        <li><Link to='/login' className='link'>Login</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar