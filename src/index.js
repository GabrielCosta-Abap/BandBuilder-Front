import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>

  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);


function storeValues() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const born = document.getElementById("born").value;
  const tel = document.getElementById("tel").value;
  const password = document.getElementById("password").value;

  localStorage.setItem("name", name);
  localStorage.setItem("born", born);
  localStorage.setItem("email", email);
  localStorage.setItem("tel", tel);
  localStorage.setItem("password", password);
}

export default storeValues;
