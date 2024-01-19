import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
  return (
    <div>
        <button onClick={() => {
            navigate('/login')
        }}>
            Đăng nhập
        </button>
        <Link to={'/login'}>
            <div>Đăng nhập</div>
        </Link>
    </div>
  )
}

export default Home