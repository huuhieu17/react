import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiLoggedInInstance } from '../../utils/api';
import { userContext } from '../../contexts/userContext';
import "./home.css"
const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const [user, setUser] = useState({});
    
    const userContextData = useContext(userContext)
    
    useEffect(() => {
        apiLoggedInInstance({
            url: '/api/auth/user-info',
            method: "GET"
        }).then(response => {
            setUser(response.data);
            console.log(response)
        })
    }, [])

  return (
    <div>
        <button onClick={() => {
            navigate('/login')
        }}>
            username: {user.username}
        </button>
        <button onClick={() => {
            userContextData.handleLogout();
        }}>
            DDawng xuat
        </button>
        <div className='container'>
            <div className='box box1'>Noi dung ben trong</div>
            <div className='box box2'>Noi dung ben trong</div>
        </div>
        <div>{token ? "Da dang nhap" : 'Chua dang nhap'}</div>
    </div>
  )
}

export default Home