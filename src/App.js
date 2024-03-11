import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import { UserProvider } from './contexts/userContext';
import NotFound from './pages/404';
import Chat from './pages/chat/Chat';
import NganhNghe from './pages/danh-muc/nganh-nghe/demo';
import Home from './pages/home';
import Login from './pages/login';
import Products from './pages/product';
import QuanTriThanhVien from './pages/quan-tri-thanh-vien';
function App() {
  const dispatch = useDispatch()
  const token = localStorage.getItem("token")
  return (
    <UserProvider>
      <BrowserRouter>
            <Routes>
              <Route path='*' element={<NotFound/>}/>
              <Route path="/" element={<Layout />}>
                  <Route path="/" element={<Home/>} />
                  <Route path="/products" element={<Products/>} />
                  <Route path='/danh-muc'>
                      <Route path='nganh-nghe' element={<NganhNghe/>}/>
                  </Route>
                  <Route path='/quan-tri-thanh-vien' element={<QuanTriThanhVien/>}/>
                  <Route path='/chat' element={<Chat/>}/>
              </Route>
              <Route path="/login" element={<Login/>} />
              
            </Routes>
          </BrowserRouter>
    </UserProvider>
    
  );
}

export default App;
