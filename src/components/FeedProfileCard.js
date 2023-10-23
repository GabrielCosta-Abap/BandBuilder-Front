import ProfilePic from '../assets/profilePic1.jpg'
import '../css/FeedProfileCard.css'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
export default function ProfileCard({profile}){

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
                    <span className='profile-card-instruments'>
                        <span className='profile-card-instruments-title'>INSTRUMENTOS:</span> {profile.instruments}
                    </span>
                    <span className='profile-card-description-title'>Descrição:</span>
                </div>
            </div>
            
            <div className='profile-card-info'>
                    <p className='profile-card-description-text'>{profile.description} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>

            <div className='profile-card-solic-button'>
                <div className='profile-card-like'>
                    <GroupAddIcon />
                    <span className='profile-card-like-text'>ENVIAR SOLICITAÇÃO</span>
                </div>
            </div>

            </div>
        </div>

    )
}