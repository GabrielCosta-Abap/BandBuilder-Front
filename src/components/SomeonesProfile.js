import React, { useEffect, useState } from 'react';
import { firebaseConfig } from '../service/Firebase.js';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { obterIdDaRota } from '../utils';
import '../css/SomeonesProfile.css';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
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
    const params = new URLSearchParams(window.location.search);
    const getMyId = params.get('myId');
    const url = `/home?id=${getMyId}`;
    const navigate = useNavigate();
    const userID = params.get('someonesId');

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
                    let response;
                    if (userID.startsWith('B')) {
                        response = await API.get(`/bands/${userID}`);
                    } else {
                        response = await API.get(`/usuario/${userID}`);
                    }
                    const user = response.data;
                    console.log('Dados brutos da API:', user);

                    setUserInfo({
                        name: user.name,
                        email: user.email,
                        gender: user.gender,
                        phone: user.phone,
                        city: user.city,
                        password: user.password,
                        instruments: user.instruments,
                        musical_genre: user.musical_genre,
                        youtube_link: user.youtube_link,
                        description: user.description,
                        whatsapp: user.whatsapp,
                        youtube_page: user.youtube_page,
                        ig_page: user.ig_page,
                        facebook_page: user.facebook_page
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
        setIsZoomed(!isZoomed);
    };

    return (
        <div className='someonesprofile-body'>
            <div className='btn-home'>
                <button onClick={() => navigate(url)}>
                    <FontAwesomeIcon icon={faHouse} />
                </button>
            </div>
    
            <div className={`someonesprofile-container ${isZoomed ? 'zoomed' : ''}`} style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
                <div className='someonesprofile-user-pic' onClick={handleImageClick}>
                    <img src={imageUrl} alt='User' style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
                {userInfo && (
                    <>
                        {userID.startsWith('B') && (
                            <>
                                <p>{userInfo.name}</p>
                                <p>Cidade: {userInfo.city}</p>
                                <p className='description-area'>Descrição: {userInfo.description}</p>
                                <p>Youtube:<a href={userInfo.youtube_page}>{userInfo.youtube_page}</a></p>
                                <p>Instagram:<a href={userInfo.ig_page}>{userInfo.ig_page}</a></p>
                                <p>Facebook:<a href={userInfo.facebook_page}>{userInfo.facebook_page}</a></p>
                                <p>Gênero Muscial:{userInfo.musical_genre}</p>
                            </>
                        )}
                        {!userID.startsWith('B') && (
                            <>
                                <h2>{userInfo.name}</h2>
                                <p>Cidade: {userInfo.city}</p>
                                <p>Instrumentos: {userInfo.instruments.join(', ')}</p>
                                <p>Estilo Musical: {userInfo.musical_genre}</p>
                                <p className='description-area'>Descrição: {userInfo.description}</p>
                                <p>Youtube: <a href={userInfo.youtube_link}>{userInfo.youtube_link}</a></p>
                            </>
                        )}
                    </>
                )}
                <div className="someonesprofile-user-info">
                    {/* Pode adicionar informações adicionais do usuário aqui */}
                </div>
                <div className='profile-card-solic-button'>
                    <div className={buttonClass} style={{ marginTop: '20px', padding: '10px', cursor: 'pointer', backgroundColor: 'rgba(0, 123, 255, 0.15)', color: '#fff' }}>
                        {icon}
                        <span className='profile-card-like-text'>{description}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}