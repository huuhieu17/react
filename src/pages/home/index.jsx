import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiLoggedInInstance } from '../../utils/api';
import { userContext } from '../../contexts/userContext';
import "./home.css"
const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const imagePath = localStorage.getItem("image")
    const [user, setUser] = useState({});
    const [localFile, setLocalFile] = useState();
    const [image, setImage] = useState();
    const userContextData = useContext(userContext)

    
    const handleUploadFile = () => {
        if(localFile){
            const formData = new FormData();
            formData.append("upload", localFile);
            apiLoggedInInstance({
                url: '/api/file/upload',
                method: "POST",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(response => {
                if(!response.data) return;
                localStorage.setItem("image", response.data.pathOnServer)
            })
        }
    }

    useEffect(() => {
        apiLoggedInInstance({
            url: '/api/auth/user-info',
            method: "GET"
        }).then(response => {
            if(!response.data) return;
            setUser(response.data);
        })
    }, [])

    useEffect(() => {
        
        if(imagePath){
            apiLoggedInInstance({
                url: '/api/file/view/'+imagePath,
                method: "GET",
                responseType: "blob"
            }).then(response => {
                if(response.data){
                    setImage(URL.createObjectURL(response.data))
                }
            })
        }
    }, [imagePath])

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
        <div className=''>
            {/* Input để chọn file */}
            <div>
                <input type='file' onChange={(event) => {
                    console.log(event.target.files[0])
                    setLocalFile(event.target.files[0])
                }}/>
            </div>
            <div>
                <img className='w-96 h-96' src={localFile && URL.createObjectURL(localFile)} alt='preview ảnh'/>
            </div>
            <button className='border p-2' onClick={() => {
                handleUploadFile()
            }}>Upload</button>
            <div>
                <div>Anh upload:</div>
                {image && <img src={image} alt='upload image'/>}
            </div>

        </div>
        <div>{token ? "Da dang nhap" : 'Chua dang nhap'}</div>
    </div>
  )
}

export default Home