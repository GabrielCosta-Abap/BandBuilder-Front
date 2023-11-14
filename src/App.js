import { useState } from 'react';

import Login from './components/Login';
import Home from './components/Home';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ProfileSelection from './components/ProfileSelection';
import Register from "./components/Registro";
import Register2 from "./components/Registro-2";
import UploadPic from './components/UploadPic';
import { AnimatePresence } from "framer-motion";


function App() {
   const location = useLocation();
  return (
      <>
         <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/profileselection" element={<ProfileSelection />}/>
         </Routes>
      </>
   );
}

export default App;
