// SomeonesProfile.js
import React, { useEffect, useState } from 'react';
import { firebaseConfig } from '../service/Firebase.js';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { obterIdDaRota } from '../utils';
import '../css/SomeonesProfile.css';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

export default function SomeonesProfile() {
    const solicButtonText = 'SOLICITAR CONTATO';
    const [imageUrl, setImageUrl] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [buttonClass, setButtonClass] = useState('profile-card-like');
    const [icon, setIcon] = useState(<ConnectWithoutContactIcon />);
    const [description, setDescription] = useState(solicButtonText);

    const [userInfo, setUserInfo] = useState({
        name: 'Nome do Usuário',
        city: 'Cidade do Usuário',
        instruments: ['Instrumento 1', 'Instrumento 2'],
        musicalStyle: 'Estilo Musical',
        description: 'Descrição do Usuário',
    });

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
            const params = new URLSearchParams(window.location.search);
            const userID = params.get('someonesId');

            const url = await getImageUrl('images/' + userID);
            setImageUrl(url);
        };

        fetchImageUrl();
    }, []);

    const handleImageClick = () => {
        // Inverte o estado de ampliação ao clicar na imagem
        setIsZoomed(!isZoomed);
    };

    return (

        <div className='someonesprofile-body'>

            <div className={`someonesprofile-container ${isZoomed ? 'zoomed' : ''}`}>
                <div className='someonesprofile-user-pic' onClick={handleImageClick}>
                    <img src={imageUrl} alt='User' />
                </div>

                <div className="someonesprofile-user-info">
                    <h2>{userInfo.name}</h2>
                    <p>Cidade: {userInfo.city}</p>
                    <p>Instrumentos: {userInfo.instruments.join(', ')}</p>
                    <p>Estilo Musical: {userInfo.musicalStyle}</p>
                    <p>Descrição: {userInfo.description}</p>
                </div>
            
                <div className='profile-card-solic-button' 
                // onClick={(e) => onSolicClick(e, profile.user_id || profile.band_id)}
                >
                    <div className={buttonClass}>
                    {icon}    
                    <span className='profile-card-like-text'>{description}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
