import ProfilePic from '../assets/no-profile-pic-avatar.png';
import React, { useEffect, useState } from 'react';
import { firebaseConfig } from '../service/Firebase.js';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { obterIdDaRota } from '../utils';
import '../css/MyProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faSave, faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import API from '../service/API';
import SentSolicitations from './SentSolicitations.js';
import FeedProfileCard from '../components/FeedProfileCard'

export default function MyProfile() {
   const [imageUrl, setImageUrl] = useState(null);
   const [userData, setUserData] = useState(null);
   const [isEditing, setIsEditing] = useState(false);
   const [editedData, setEditedData] = useState({
      NAME: '',
      EMAIL: '',
      GENDER: '',
      PHONE: '',
      CITY: '',
      DESCRIPTION: '',
      INSTRUMENTS: ''
      // Adicione outros campos conforme necessário
   });
   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
   const navigate = useNavigate();

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
      const fetchUserData = async () => {
         const userID = obterIdDaRota();

         if (userID) {
            try {
               const response = await API.get(`/usuario/${userID}`)
                  // .then((userDataUpdated)=>{
                  //    setUserData(userDataUpdated)
                  // })


               const user = response.data; // Ajuste aqui para obter os dados do usuário corretamente
               console.log('Dados brutos da API:', user);


               setUserData(user);


               setEditedData({
                  name: user.name,
                  email: user.email,
                  gender: user.gender,
                  phone: user.phone,
                  city: user.city,
                  password: user.password,
                  instruments: user.instruments,
                  musical_genre: user.musical_genre,
                  youtube_link: user.youtube_link,
                  description: user.description
                  // Adicione outros campos conforme necessário
               });

               const url = await getImageUrl(`images/${userID}`);
               setImageUrl(url);
            } catch (error) {
               console.error('Erro ao buscar dados do usuário:', error);
            }
         }
      };

      fetchUserData(); // Chame a função aqui para garantir que seja executada quando o componente montar
   }, []); // Adicione os colchetes vazios para garantir que o useEffect só seja executado uma vez

   const handleSaveChanges = async () => {
      const userID = obterIdDaRota();

      if (userID) {
         try {
            console.log({ instruments: editedData.instruments });
            const response = await API.put(`/usuario/${userID}`, {
               name: editedData.name,
               email: editedData.email,
               gender: editedData.gender,
               phone: editedData.phone,
               city: editedData.city,
               password: editedData.password,
               instruments: editedData.instruments,
               musical_genre: editedData.musical_genre,
               youtube_link: editedData.youtube_link,
               description: editedData.description
            });


            if (response.status === 200) {
               console.log('Dados do usuário atualizados com sucesso!');
               setIsEditing(false);
               setShowSuccessMessage(true);

               response.data.instruments = response.data.instruments.split(',')

               setUserData(response.data)
               // Desativar ou remover o foco dos campos de input
               document.querySelectorAll('.input-field').forEach((input) => {
                  input.disabled = true;
               });

               setTimeout(() => {
                  setShowSuccessMessage(false);
                  window.location.reload(true);
               }, 2000);
            } else {
               console.error('Erro ao atualizar dados do usuário:', response.statusText);
            }
         } catch (error) {
            console.error('Erro ao atualizar dados do usuário:', error);
         }
      }
   };

   const id = obterIdDaRota()
   const url = `/home?id=${id}`
   const [profiles, setProfiles] = useState([]);
   let allProfiles = []

   const handleEditProfile = () => {
      setIsEditing(true);
   };

   const handleCancelEdit = () => {
      setIsEditing(false);
      // Reverter as alterações nos campos editáveis se necessário
   };


   const handleInputChange = (e) => {
      const { name, value } = e.target;
      let updatedValue = value;

      if (name === 'instruments') {
         // Separar os valores por vírgulas e remover espaços desnecessários
         updatedValue = value.split(',').map(item => item.trim());
      }

      setEditedData((prevData) => ({ ...prevData, [name]: updatedValue }));
   };


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
      <div className='myprofile-body'>
         <div className='btn-home'>

            <button onClick={() => navigate(url)}>
               <FontAwesomeIcon icon={faHouse} />
            </button>
         </div>
         <div className='content-container'>
            <div className='myprofile-container'>
               <div className='wrap-pic-profile'>
                  <div className='pic-profile'>
                     <img src={imageUrl || ProfilePic} alt='Usuário' />
                  </div>
                  <div className='edit-info-profile'>
                     {!isEditing ? (
                        <button onClick={handleEditProfile}>
                           <FontAwesomeIcon icon={faPencil} />
                        </button>
                     ) : (
                        <>
                           <button onClick={handleSaveChanges}>
                              <FontAwesomeIcon icon={faSave} />
                           </button>
                        </>
                     )}
                  </div>
               </div>



               {userData && (
                  <div className='user-data'>
                     {!isEditing ? (
                        <>
                           <p className='name-value'>{userData.name}</p>
                           <p className='city-value'>{userData.city}</p>
                           <p className='description-value'>{userData.description}</p>
                           <p className='line-sep'>_________________</p>
                           <p><span className='tit-info'>Email:</span> {userData.email}</p>
                           <p><span className='tit-info'>Gênero:</span> {userData.gender}</p>
                           <p><span className='tit-info'>Telefone:</span> {userData.phone}</p>
                           <p><span className='tit-info'>Instrumentos:</span> {userData.instruments.join(', ')}</p>
                           <p><span className='tit-info'>Youtube:</span> {userData.youtube_link}</p>
                           <p><span className='tit-info'>Gênero Muscial:</span> {userData.musical_genre}</p>
                           {/* Adicione outros dados do usuário conforme necessário */}
                        </>
                     ) : (
                        <>
                           <div className='input-area'>
                              <label>Nome:</label>
                              <input
                                 type='text'
                                 name='name'
                                 value={editedData.name}
                                 onChange={handleInputChange}
                              />
                           </div>
                           <div className='input-area'>
                              <label>E-mail:</label>
                              <input
                                 type='text'
                                 name='email'
                                 value={editedData.email}
                                 onChange={handleInputChange}
                              />
                           </div>

                           <div className='input-area'>
                              <label>Descrição:</label>
                              <textarea
                                 className='text-area-desc'
                                 type='text'
                                 name='description'
                                 maxLength={250}
                                 value={editedData.description}
                                 onChange={handleInputChange}
                              />
                           </div>

                           <div className='input-area'>
                              <label>Genero:</label>
                              <input
                                 type='text'
                                 name='gender'
                                 value={editedData.gender}
                                 onChange={handleInputChange}
                              />
                           </div>

                           <div className='input-area'>
                              <label>Telefone:</label>
                              <input
                                 type='tel'
                                 name='phone'
                                 value={editedData.phone}
                                 onChange={handleInputChange}
                              />
                           </div>

                           <div className='input-area'>
                              <label>Cidade:</label>
                              <input
                                 type='text'
                                 name='city'
                                 value={editedData.city}
                                 onChange={handleInputChange}
                              />
                           </div>

                           <div className='input-area'>
                              <label>Instrumentos:</label>
                              <input
                                 type='text'
                                 name='instruments'
                                 value={editedData.instruments.join(', ')}
                                 onChange={handleInputChange}
                              />
                           </div>

                           <div className='input-area'>
                              <label>Youtube:</label>
                              <input
                                 type='tel'
                                 name='youtube_link'
                                 value={editedData.youtube_link}
                                 onChange={handleInputChange}
                              />
                           </div>

                           <div className='input-area'>
                              <label>Gênero Musical:</label>
                              <input
                                 type='text'
                                 name='musical_genre'
                                 value={editedData.musical_genre}
                                 onChange={handleInputChange}
                              />
                           </div>


                           {/* Adicione outros campos editáveis conforme necessário */}
                        </>
                     )}
                     {showSuccessMessage && (
                        <div className='success-message'>
                           Os dados foram salvos com sucesso!
                        </div>
                     )}
                  </div>

               )}

            </div>
            <div className='solicit-wrap'>
               <h2>Minha solicitações</h2>
            
            <div className='home-feed-profile'>

               {profiles.map((profile, index) => (
                  <FeedProfileCard key={profile.user_id || profile.band_id} profile={profile} sentSolicsScreen='true' className='feed-profile-card'/>

               ))}
            </div>
            </div>
         </div>
      </div>
   );
}
