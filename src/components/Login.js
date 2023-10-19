import { useState, useEffect } from 'react';
import Logo from '../assets/logo.jpg' 
import API from '../service/API' 
import '../styles.css'
import { Link } from 'react-router-dom';

export default function Login() {

  const [loginData, setLoginData] = useState("")

  function handleInputChange(event) {
    const { name, value } = event.target;

    setLoginData((loginData) => ({
      ...loginData,
      [name]: value,
          
    }));
    
    }

  function loginApp(event){
    event.preventDefault()
    
        API.post("/usuario/login", loginData)
        .then((response) => {

            console.log(response)
            window.location.replace(window.location.href + 'ProfileSelection?userid=' + response.data.user_id ) 
            
        })
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            window.alert("USUÁRIO OU SENHA INCORRETOS!")
        });
    }

  return (

    <div className="container">
    <div className="container-login">
    <div className="wrap-login">
        <form className="login-form">
        {/* <span className="login-form-title">Bem-vindo!</span> */}
        <span className="login-form-title">
            <img src={Logo} alt="Logo BandBuilder" />
        </span>

        <div className='wrap-input'>
            <input 
            name='email'
            className={loginData.email && loginData.email !== "" ? 'has-val input' : 'input'}
            type='email'
            value={loginData.email}
            onChange={handleInputChange} />

            <span className='focus-input' data-placeholder='E-mail'></span>
        </div> 

        <div className='wrap-input'>
            <input 
            name='password'
            className={loginData.email && loginData.password !== "" ? 'has-val input' : 'input'}
            type='password'
            value={loginData.password}
            onChange={handleInputChange}
            />
            <span className='focus-input' data-placeholder='Senha'></span>
        </div> 

        <div className='container-login-form-btn'>
            <button onClick={loginApp} className='login-form-btn'>Entrar</button>
        </div>
        
        <div className='text-center'>
            <span className='txt1'>Não possui conta?</span>

            <Link to="/createaccount">
                <a className='txt2'>Cadastre-se</a>
            </Link>
        </div>

        </form>
    </div>
    </div>
    </div>

);
}