import ProfilePic from '../assets/profilePic1.jpg'

export default function ProfileCard({profile}){

    const navToHome = (e, key)=>{
        window.location.href = '/home?id=' + key
    }

    return(

        <div className='item' onClick={(e) => navToHome(e, profile.user_id || profile.band_id )}>
        <div className='image'>
            <img src={ProfilePic} alt='profile pic'></img>
        </div>
        <div className='info'>
            <span className='name'>{profile.name}</span>
        </div>
        </div>

    )
}