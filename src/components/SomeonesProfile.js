// SomeonesProfile.js
import React, { useEffect, useState } from 'react';
import { firebaseConfig } from '../service/Firebase.js';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { obterIdDaRota } from '../utils';
import '../css/SomeonesProfile.css';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import {faHouse} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import API from '../service/API.js';
import { useNavigate } from 'react-router-dom';

export default function SomeonesProfile() {
    const solicButtonText = 'SOLICITAR CONTATO';
    const [imageUrl, setImageUrl] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [buttonClass, setButtonClass] = useState('profile-card-like');
    const [icon, setIcon] = useState(<ConnectWithoutContactIcon />);
    const [description, setDescription] = useState(solicButtonText);
    const id = obterIdDaRota()
    const url = `/home?id=${id}`
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        name: '',
        city: '',
        instruments: [''],
        musicalStyle: '',
        description: '',
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



        const fetchUserData = async () => {
            const params = new URLSearchParams(window.location.search);
            const userID = params.get('someonesId');

            if (userID) {
                try {
                    const response = await API.get(`/usuario/${userID}`);
                    const user = response.data; // Ajuste aqui para obter os dados do usuário corretamente
                    console.log('Dados brutos da API:', user);


                    setUserInfo({
                        name: user.name,
                        gender: user.gender,
                        city: user.city,
                        instruments: user.instruments,
                        musical_genre: user.musical_genre,
                        youtube_link: user.youtube_link,
                        description: user.description
                        // Adicione outros campos conforme necessário
                    });

                } catch (error) {
                    console.error('Erro ao buscar dados do usuário:', error);
                }
            }
        };
        fetchImageUrl();
        fetchUserData();

    }, []);

    const handleImageClick = () => {
        // Inverte o estado de ampliação ao clicar na imagem
        setIsZoomed(!isZoomed);
    };

    

    return (

        <div className='someonesprofile-body'>
            <div className='btn-home'>

                <button onClick={() => navigate(url)}>
                    <FontAwesomeIcon icon={faHouse} />
                </button>
            </div>

            <div className={`someonesprofile-container ${isZoomed ? 'zoomed' : ''}`}>
                <div className='someonesprofile-user-pic' onClick={handleImageClick}>
                    <img src={imageUrl} alt='User' />
                </div>

                <div className="someonesprofile-user-info">
                    <h2>{userInfo.name}</h2>
                    <p>Cidade: {userInfo.city}</p>
                    <p>Instrumentos: {userInfo.instruments.join(', ')}</p>
                    <p>Estilo Musical: {userInfo.musical_genre}</p>
                    <p className='description-area'>Descrição: {userInfo.description}</p>
                    <p>Youtube: <a href={userInfo.youtube_link}>{userInfo.youtube_link}</a></p>
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
