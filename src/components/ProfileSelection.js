import React from 'react'
import API from '../service/API' 
import { useState, useEffect, useRef } from 'react';
import Chevron from '../assets/orange-arrow.png'
import '../css/ProfileSelection.css'
import ProfileCard from '../components/ProfileCard'

export default function ProfileSelection(){
    
    const carousel = useRef(null);
    const [profiles, setProfiles ] = useState([]);
    const [userData, setUserData ] = useState([]);

    useEffect(()=>{

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('userid')

        let url = '/usuario/list_User_profiles/' + id

        API.get(url)
        .then((response) => {
            console.log(response.data)
            setProfiles(response.data);
            
        })
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            // window.alert("OCORREU UM ERRO AO BUSCAR DADOS DE USUÁRIO!")
        });

        url = '/usuario/' + id
        API.get(url)
        .then((response)=>{
            setUserData(response.data)
        })
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            // window.alert("OCORREU UM ERRO AO BUSCAR DADOS DE USUÁRIO!")
        });

    }, [])

    const handleLeftClick = (e)=>{
        e.preventDefault();
        carousel.current.scrollLeft -= carousel.current.offsetWidth
        
    }
    const handleRightClick = (e)=>{
        e.preventDefault();
        carousel.current.scrollLeft += carousel.current.offsetWidth
    }

    return(
        <div className='profiles-body'>
            <div className='title'>
                <h1>Selecione o perfil</h1>
            </div>

            <div className='profiles-container'>
                <div className='carousel' ref={carousel}>

                    {/* { userData.id = userData.user_id } */}
                        <ProfileCard key={userData.user_id} profile={userData}/>

                    { profiles.map(profile => (
                        <ProfileCard key={profile.band_id} profile={profile} />
                    ))}                    
                
                </div>

                <div className='buttons'>
                    <button onClick={handleLeftClick}>
                        <img src={Chevron} alt='scroll left'></img>
                    </button>
                    <button onClick={handleRightClick}>
                        <img src={Chevron} alt='scroll right'></img>
                    </button>

                </div>
            </div>
        </div>
    )
}