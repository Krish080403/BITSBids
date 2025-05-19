import React from 'react';
import './App.css';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from "react-router-dom";
import ProductsList from './components/ProductsList';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import AddProduct from './components/AddProduct';
import Login from './components/Login';
import Layout from './components/Layout';
import Unauthorised from './components/Unauthorised';
import Register from './components/Register';
import Missing from './components/Missing';
import Bid from './components/Bid';
import Chats from './components/Chats';
import Chat from './components/Chat';
import Users from './components/Users';
import User from './components/User';



function App() {


  return (
    <>



      <div className="container">

        <HeaderComponent />
        <Routes>
          <Route path="/" element={<Layout />}>
            {/*Public Routes*/}
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="unauthorised" element={<Unauthorised />}></Route>


            {/*Protected Routes*/}
            <Route path="" element={<ProductsList />}></Route>
            <Route path="/" element={<ProductsList />}></Route>
            <Route path="/products" element={<ProductsList />}></Route>
            <Route path="/addproduct" element={<AddProduct />}></Route>
            <Route path="/chat" element={<Chat />}></Route>
            <Route path="/chats" element={<Chats />}></Route>
            <Route path="/bid" element={<Bid />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/user" element={<User />}></Route>
            {/*catch all Routes*/}
            <Route path="*" element={<Missing />}></Route>
          </Route>

        </Routes>
        <FooterComponent />
      </div>

    </>
  );
}

export default App;
