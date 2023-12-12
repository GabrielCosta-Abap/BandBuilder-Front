import ProfilePic from '../assets/no-profile-pic-avatar.png';
import '../css/FeedProfileCard.css';
import { obterIdDaRota } from '../utils.js'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import API from '../service/API'
import { firebaseConfig } from '../service/Firebase.js';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import 'firebase/storage';
import { initializeApp } from "firebase/app";
import React, { useEffect, useState } from 'react';

export default function FeedProfileCard({ profile, sentSolicsScreen}) {
    
    console.log(sentSolicsScreen)
    const solicButtonText = sentSolicsScreen == 'true' ? 'SOLICITAÇÃO ENVIADA' : 'SOLICITAR CONTATO';
    const solicButtonClass = sentSolicsScreen == 'true' ? 'profile-card-like-clicked' : 'profile-card-like';
    const id = profile.user_id || profile.band_id
    const [description, setDescription] = useState(solicButtonText);
    const [buttonClass, setButtonClass] = useState(solicButtonClass);
    const [icon, setIcon] = useState(<ConnectWithoutContactIcon />);
    const [imageUrl, setImageUrl] = useState(null);
    const [instruments, setInstruments] = useState([]);

    let instrumentsClass = '';

    if (profile.band_id) {
        instrumentsClass = 'display-none';
    } else {
        instrumentsClass = 'profile-card-instruments';
    }

    useEffect(() => {
        const getImageUrl = async (imageName) => {
          try {
    
            const app = initializeApp(firebaseConfig);
            const storage = getStorage(app);
            const imageRef = ref(storage, imageName);
            const imageUrl = await getDownloadURL(imageRef);
            return imageUrl;
          } catch (error) {
            console.error('Erro ao buscar imagem:', error);
            return null;
          }
        };
    
        const fetchImageUrl = async () => {

          const url = await getImageUrl('images/' + id);
          setImageUrl(url);
        };
    
        
        API.get(`/usuario/${profile.band_id || profile.user_id}`)
            .then((user)=>{
                setInstruments(user.data.instruments.join(', '))
            })        
        
        fetchImageUrl();

      }, []);
    

    const navToUserProfile = (e, key) => {

        window.location.href = `/someonesprofile?myId=${obterIdDaRota()}&someonesId=${key}`;
    };

    const onSolicClick = (e, receiverId) => {
        e.preventDefault();

        const userId = obterIdDaRota();

        API.post(`/usuario/send_contact_solic/${userId}/${receiverId}`)
        .then((response) => {

            setDescription(description === solicButtonText ? 'SOLICITAÇÃO ENVIADA' : solicButtonText);
            setButtonClass(buttonClass === 'profile-card-like' ? 'profile-card-like-clicked' : 'profile-card-like');
            setIcon(icon.type === ConnectWithoutContactIcon ? <HowToRegIcon /> : <ConnectWithoutContactIcon />);

        })
        .catch((error) => {
            console.error('Erro ao obter solicitações de contato:', error);
        });

    };

    return (
        <div className='user-profile-card'>
            <div className='item'>
                <div className='image'>
                    <img src={imageUrl || ProfilePic} alt='profile pic'></img>
                    <div className='profile-card-header'>
                        <span className='profile-card-name' onClick={(e) => navToUserProfile(e, profile.user_id || profile.band_id)}>{profile.name} </span>
                        <span className='profile-card-city'>{profile.city}</span>
                        <span className={instrumentsClass}>
                            <span className='profile-card-instruments-title'>INSTRUMENTOS:</span>
                            <span>{instruments}</span>
                        </span>
                        <span className='profile-card-musical-genres'>
                            <span className='profile-card-musical-genres-title'>GÊNERO MUSICAL:</span>
                            <span>{profile.musical_genre}</span>
                        </span>
                        <span className='profile-card-description-title'>Descrição:</span>
                    </div>
                </div>

                <div className='profile-card-info'>
                    <p className='profile-card-description-text'>{profile.description}</p>
                </div>

                <div className='profile-card-solic-button' onClick={(e) => onSolicClick(e, profile.user_id || profile.band_id)}>
                    <div className={buttonClass}>
                    {icon}    
                    <span className='profile-card-like-text'>{description}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
