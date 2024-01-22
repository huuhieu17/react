import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiInstance from "../../utils/api";
import TopImage from "../../assets/images/top.png"
import BottomImage from "../../assets/images/bottom.png"
const Login = () => {
    const navigate = useNavigate()
    const params = useLocation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log({username, password});
        apiInstance({
            url: "/api/auth/login",
            method: "POST",
            params: {
                username: username,
                password: password
            }
        }).then(response => {
            const responseData = response.data;
            const {token, userId} = responseData;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            navigate("/")
        })
    }
    return (
        <div className={"w-full flex relative h-screen"}>
            <div className='w-1/2'>
                <div>Đăng nhập</div>
                <div className='w-full'>
                    <div>
                        <div>Taif khoản</div>
                        <input className='w-full border px-4 py-1 rounded' value={username} onChange={(event) => {
                            const value = event.target.value;
                            setUsername(value)
                        }} placeholder='Tài khoản' />
                    </div>
                    <div>
                        <div>Mật khẩu</div>
                        <input onChange={(event) => {
                            const value = event.target.value;
                            setPassword(value)
                        }} className='w-full border px-4 py-1 rounded' value={password} type="password" placeholder='Mật khẩu' />
                    </div>
                    <button onClick={() => handleLogin()}>Đăng nhập</button>
                </div>
            </div>
            <img className='absolute top-0 right-0' src={TopImage} alt=''/>
            <img className='absolute bottom-0 right-[30px]' src={BottomImage} alt=''/>
        </div>

    )
}

export default Login