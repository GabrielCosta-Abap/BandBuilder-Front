import { useState } from 'react';

import Login from './components/Login';
import Home from './components/Home';
import { Routes, Route, Link } from 'react-router-dom';
import CreateAccount from './components/CreateAccount';

function App() {

  return (
      <>
         <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/createaccount" element={<CreateAccount />}/>
         </Routes>
      </>
   );
}

export default App;
