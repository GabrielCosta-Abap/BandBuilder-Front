import { useState } from 'react';

import Login from './components/Login';
import Home from './components/Home';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ProfileSelection from './components/ProfileSelection';
import Register from "./components/Registro";
import Register2 from "./components/Registro-2";
import UploadPic from './components/UploadPic';
import MyProfile from './components/MyProfile';
import { AnimatePresence } from "framer-motion";


function App() {
   const location = useLocation();
  return (
      <>
         <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
               <Route path='/register' element={<Register/>}/>
               <Route path='/register-2' element={<Register2/>}/>
               <Route path='/upload-pic' element={<UploadPic/>}/>
            </Routes>
         </AnimatePresence>
         <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/profileselection" element={<ProfileSelection />}/>
            <Route path="/myprofile" element={<MyProfile />}/>
         </Routes>
      </>
   );
}

export default App;
