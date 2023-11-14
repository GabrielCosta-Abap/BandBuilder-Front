import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';

import Formato from '../assets/formato-violao.png';

import Arrow from '../assets/arrow.svg';

import {motion} from 'framer-motion';

import '../css/Register.css';

function Register() {
    // Define o estado inicial dos inputs com base nos valores armazenados no localStorage
    const [name, setName] = useState(localStorage.getItem('name') || "");
    const [email, setEmail] = useState(localStorage.getItem('email') || "");
    const [born, setBorn] = useState(localStorage.getItem('born') || "");
    const [gender, setGender] = useState(localStorage.getItem('gender') || "");
    const [tel, setTel] = useState(localStorage.getItem('tel') || "");
    const [city, setCity] = useState(localStorage.getItem('city') || "");
    const [password, setPassword] = useState(localStorage.getItem('password') || "");

    useEffect(() => {
        // Atualiza o localStorage sempre que os valores dos inputs mudarem
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('born', born);
        localStorage.setItem('gender', gender);
        localStorage.setItem('tel', tel);
        localStorage.setItem('city', city);
        localStorage.setItem('password', password);
    }, [name, email, born, gender, tel, city, password]);
    

    const onSubmit= (e) => {
        e.preventDefault();
        const data = {
            firstName: e.target.elements.firstName.value,
            email: e.target.elements.email.value,
            born_date: e.target.elements.born.value,
            gender: e.target.elements.gender.value,
            phone: e.target.elements.tel.value,
            city: e.target.elements.city.value,
            password: e.target.elements.password.value,
        }
        
        window.location = '/register-2?data=' + JSON.stringify(data);
        console.log(data);

    }

    
    return (
        <motion.div className="container-register-body"
            initial={{x: 190}} 
            animate={{ x: 0}}
        >
            <div className="container-register">
                <div className="wrap-register">
                    <form className="register-form" onSubmit={onSubmit}>

                        <div className='wrap-input-register input-name'>
                            <input
                                className={name !== "" ? 'has-val input-register js_input_name' : 'input-register'}
                                type='text'
                                name='firstName'
                                value={name}
                                id='name'
                                required
                                onChange={e => setName(e.target.value)} />

                            <span className='focus-input-register' data-placeholder='Nome'></span>
                        </div>

                        <div className='wrap-input-register input-email'>
                            <input
                                className={email !== "" ? 'has-val input-register js-input-email' : 'input-register'}
                                type='email'
                                name='email'
                                value={email}
                                id='email'
                                required
                                onChange={e => setEmail(e.target.value)} />

                            <span className='focus-input-register' data-placeholder='E-mail'></span>
                        </div>

                        <div className='wrap-input-register input-born'>
                            <input
                                className={born !== "" ? 'has-val input-register js-input-born' : 'input-register'}
                                type='date'
                                name='born'
                                value={born}
                                id='born'
                                required
                                onChange={e => setBorn(e.target.value)} />

                            <span className='focus-input-register-born'>Data de nascimento</span>
                        </div>

                        <div className='wrap-input-register input-radio'>
                            <span className='focus-input-register-gender'>Gênero</span>
                            <input type='radio' name='gender' id="masc" value="Masculino"
                                onChange={e => setGender(e.target.value)} />
                            <label className='tab' htmlFor="masc">Masculino</label>
                            <input type='radio' name='gender' id="fem" value="Feminino"
                                onChange={e => setGender(e.target.value)} />
                            <label className='tab' htmlFor="fem">Feminino</label>
                            <input type='radio' name='gender' id="outro" value="Outro"
                                onChange={e => setGender(e.target.value)} />
                            <label className='tab' htmlFor="outro">Outro</label>

                            <span className='glider'></span>
                        </div>

                        <div className='wrap-input-register input-tel'>
                            <input
                                className={tel !== "" ? 'has-val input-register js-input-tel' : 'input-register'}
                                type='tel'
                                name='tel'
                                value={tel}
                                id='tel'
                                required
                                onChange={e => setTel(e.target.value)} />

                            <span className='focus-input-register' data-placeholder='Telefone'></span>
                        </div>

                        <div className='wrap-input-register input-city'>
                            <input
                                className={city !== "" ? 'has-val input-register js-input-city' : 'input-register'}
                                type='text'
                                name='city'
                                value={city}
                                required
                                onChange={e => setCity(e.target.value)} />

                            <span className='focus-input-register' data-placeholder='Cidade'></span>
                        </div>

                        <div className='wrap-input-register input-password'>
                            <input
                                className={password !== "" ? 'has-val input-register js-input-password' : 'input-register'}
                                type='password'
                                name='password'
                                value={password}
                                id='password'
                                required
                                onChange={e => setPassword(e.target.value)}
                            />
                            <span className='focus-input-register' data-placeholder='Senha'></span>
                        </div>

                        <div className='container-register-form-btn'>
                            <button className='register-form-btn' type='submit'><img src={Arrow}/></button>
                        </div>

                        <div className='text-center'>
                            <span className='txt-1'>Já possui conta?</span>
                            <Link className='txt-2' to="/">Faça o login</Link>
                        </div>
                        
                    </form >

                </div>
                <div className='formato-violao-svg'>
                    <img src={Formato} />
                </div>
            </div>  
        </motion.div>
    )
    
}

export default Register