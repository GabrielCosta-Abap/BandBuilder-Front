import React, { useState } from 'react';
import ProfilePic from '../assets/profilePic1.jpg';
import '../css/FeedProfileCard.css';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export default function ProfileCard({ profile }) {
    const solicButtonText = 'SOLICITAR CONTATO';

    const [description, setDescription] = useState(solicButtonText);
    const [buttonClass, setButtonClass] = useState('profile-card-like');
    const [icon, setIcon] = useState(<ConnectWithoutContactIcon />);

    let instrumentsClass = '';

    if (profile.band_id) {
        instrumentsClass = 'display-none';
    } else {
        instrumentsClass = 'profile-card-instruments';
    }

    const navToUserProfile = (e, key) => {
        window.location.href = '/userprofile?id=' + key;
    };

    const onSolicClick = (e, key) => {
        e.preventDefault();

        // Altera a descrição e a classe com base no estado atual
        setDescription(description === solicButtonText ? 'SOLICITAÇÃO ENVIADA' : solicButtonText);
        setButtonClass(buttonClass === 'profile-card-like' ? 'profile-card-like-clicked' : 'profile-card-like');
        setIcon(icon.type === ConnectWithoutContactIcon ? <HowToRegIcon /> : <ConnectWithoutContactIcon />);

    };

    return (
        <div className='user-profile-card'>
            <div className='item'>
                <div className='image'>
                    <img src={ProfilePic} alt='profile pic'></img>
                    <div className='profile-card-header'>
                        <span className='profile-card-name' onClick={(e) => navToUserProfile(e, profile.user_id || profile.band_id)}>{profile.name} </span>
                        <span className='profile-card-city'>{profile.city}</span>
                        <span className={instrumentsClass}>
                            <span className='profile-card-instruments-title'>INSTRUMENTOS:</span>
                            <span>{profile.instruments}</span>
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
