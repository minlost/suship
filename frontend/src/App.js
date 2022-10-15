
import React from "react";

import { useState } from "react";
import { BrowserRouter, Router, Routes, Route, useNavigate } from "react-router-dom";


import Home from './Pages/Home'
import Blog from './Pages/Blog'
import Reservation from './Pages/Reservation'
import Nav from './components/nav'
import List from './Pages/List'
import EditPage from './Pages/EditPage'
import Login from "./Pages/Login";
import { useCookies } from 'react-cookie'





function App() {


  const [ cookies, setCookie, removeCookie ] = useCookies(['user'])

  const authToken = cookies.AuthToken



  return (
    <div>
       <BrowserRouter>
      <Nav authToken={authToken}/>
      

      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/blog' element={<Blog />}/>
          <Route path='/reservation' element={<Reservation />}/> 
          <Route path='/login' element={<Login />}/>
          <Route path='/edit/:id' element={<EditPage />}/>
          {authToken && <Route path='/list' element={<List />}/>}
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
