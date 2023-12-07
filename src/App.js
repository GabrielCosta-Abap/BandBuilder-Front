import { useState } from 'react';

import Login from './components/Login';
import Home from './components/Home';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ProfileSelection from './components/ProfileSelection';
import Register from "./components/Registro";
import Register2 from "./components/Registro-2";
import UploadPic from './components/UploadPic';
import MyProfile from './components/MyProfile';
import CreateBand from './components/CreateBand';
import { AnimatePresence } from "framer-motion";
import SomeonesProfile from './components/SomeonesProfile';
import SentSolicitations from './components/SentSolicitations';

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
            <Route path="/createband" element={<CreateBand />}/>
            <Route path="/someonesprofile" element={<SomeonesProfile />}/>
            <Route path="/sentsolicitations" element={<SentSolicitations />}/>
         </Routes>
      </>
   );
}

export default App;
