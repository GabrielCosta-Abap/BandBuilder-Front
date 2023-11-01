import ProfilePic from '../assets/profilePic1.jpg'
import '../css/FeedProfileCard.css'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

export default function ProfileCard({profile}){
    let instrumentsClass = '';
    
    if (profile.band_id) {
        instrumentsClass = 'display-none'
    }else{
        instrumentsClass = 'profile-card-instruments'
    }

    const navToUserProfile = (e, key)=>{
        window.location.href = '/userprofile?id=' + key
    }

    return(

        <div className='user-profile-card'>
            <div className='item' onClick={(e) => navToUserProfile(e, profile.user_id || profile.band_id )}>
            <div className='image'>
                <img src={ProfilePic} alt='profile pic'></img>
                <div className='profile-card-header'>
                    <span className='profile-card-name'>{profile.name}</span>
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

            <div className='profile-card-solic-button'>
                <div className='profile-card-like'>
                    <ConnectWithoutContactIcon />
                    <span className='profile-card-like-text'>SOLICITAR CONTATO</span>
                </div>
            </div>

            </div>
        </div>

    )
}