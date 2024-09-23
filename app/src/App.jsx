import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import Crocrab from './assets/crocrab.jpg'
//import './App.css'

import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route, Outlet, Link } from "react-router-dom";

import { Header } from './components/Header';
import { Signup } from './pages/Signup';
import { Home } from './pages/Home';
import { firebaseConfig } from './config/config';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


function App() {

  const FirebaseApp = initializeApp( firebaseConfig )
  const FirebaseAuth = getAuth( FirebaseApp )

  return (
    <>
    
       <Header/> 

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/Signup" element={<Signup/>} />
        </Routes>
    </>
  )
}

export default App
