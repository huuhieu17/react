import logo from './logo.svg';
import './App.css';
import Component from './components/Component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Products from './pages/product';

function App() {
  const a = 123;

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Products/>} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
