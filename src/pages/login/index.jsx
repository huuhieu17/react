import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const params = useLocation();
    console.log(params)
    const handleLogin = () => {
        navigate("/")
    }
  return (
    <div>Login
        <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  )
}

export default Login