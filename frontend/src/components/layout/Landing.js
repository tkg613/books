import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <section className='landing'>
      <div className='landing-inner'>
        <h1>Books!</h1>
        <p>This is a place for writers to showcase their work and communicate with other writers.</p>
      
        <div className='landing-buttons'>
          <Link to='/register' className='btn btn-primary'>Register</Link>
          <Link to='/login' className='btn btn-dark'>Log in</Link>
        </div>
      </div>
    </section>
  )
}

export default Landing