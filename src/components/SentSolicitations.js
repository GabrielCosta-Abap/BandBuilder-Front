import API from '../service/API'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfilePic from '../assets/no-profile-pic-avatar.png';
import '../css/SentSolicitations.css';
import { firebaseConfig } from '../service/Firebase.js';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { obterIdDaRota } from '../utils'
import FeedProfileCard from '../components/FeedProfileCard'
import '../css/Home.css'

export default function SentSolicitations({ user, instrument, onAccept, onReject, notificationItemStatus }) {
  const [profiles, setProfiles] = useState([]);
  let allProfiles = []

  useEffect(() => {

    const id = obterIdDaRota();

    API.get(`/usuario/sent_solicitations/${id}`)
      .then((response) => {
        console.log(response.data)
        setProfiles(response.data)
      })
      .catch(error => console.error('Erro ao obter solicitações:', error));
  }, []);

  return (
    <>
    <div className='home-search-bar'>
    <div className='home-navbar-menu'>
      <h1 className='sent-solics-title'>SOLICITAÇÕES ENVIADAS</h1>
    </div>
    </div>

    <div className='home-body'>
      <div className='home-feed'>
        {profiles.map((profile, index) => (
          <FeedProfileCard key={profile.user_id || profile.band_id} profile={profile} sentSolicsScreen='true'/>
          
          ))}
      </div>
    </div>
    </>
  );
}
