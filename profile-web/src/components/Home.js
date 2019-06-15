import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return(
  <div className="d-flex flex-sm-column p-4">
    <Link className='btn btn-success col-4 mb-4' to='/register'>Sign up</Link>
    <Link className='btn btn-success col-4 ' to='/login'>Log in</Link>
  </div>
  )
}

export default HomePage