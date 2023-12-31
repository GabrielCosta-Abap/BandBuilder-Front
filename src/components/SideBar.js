import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import WhatshotIcon from '@mui/icons-material/Whatshot'; // Ícone de fogo
import MusicNoteIcon from '@mui/icons-material/MusicNote'; // Ícone de instrumento musical
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import '../css/SideBar.css';
import { firebaseConfig } from '../service/Firebase.js';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import 'firebase/storage';
import { initializeApp } from 'firebase/app';
import React, { useEffect, useState } from 'react';
import ProfilePic from '../assets/no-profile-pic-avatar.png';
import EditIcon from '@mui/icons-material/Edit';
import { obterIdDaRota } from '../utils'
import API from '../service/API'


const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [instrumentNames, setInstrumentNames] = useState('');
  const [musicStyle, setMusicStyle] = useState('');
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [newPopup, setNewPopup] = React.useState(null);

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
      const id = obterIdDaRota();
      const url = await getImageUrl('images/' + id);
      setImageUrl(url);
    };

    fetchImageUrl();
  }, []);

  const handleLogoff = () => {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (isLocalhost) {
      window.location.href = 'http://localhost:3000';
    } else {
      window.location.href = 'https://band-builder-front.vercel.app/';
    }
  };

  const handleBuildBandClick = () => {
    setOpenPopup(true);
  };

  const handleCreateBandClick = () =>{
    const id = obterIdDaRota();
    const url = `/createband?userID=${id}`;
    navigate(url);
  }

  const handlePopupClose = () => {
    setOpenPopup(false);
  };

  const handlePopupSubmit = () => {
    // Lógica para enviar as solicitações com as habilidades e o estilo informados
    console.log('Instrumentos:', instrumentNames);
    console.log('Estilo Musical:', musicStyle);

    let bandBuildData = {}
    bandBuildData.instruments = instrumentNames.split(',')
    bandBuildData.musical_genre = musicStyle

    let id = obterIdDaRota()

    API.post(`/usuario/bandbuild/${id}`, bandBuildData) 
      .then(()=>{

        setOpenPopup(false);

        const newPopup = (
          <Dialog open={true} onClose={() => setNewPopup(null)}>
            <DialogTitle>BAND BUILD ACIONADO! VERIFIQUE A ABA 'SOLICITAÇÕES ENVIADAS'!</DialogTitle>
            <DialogContent>
              {/* Conteúdo do novo popup, se necessário */}
              <Button onClick={() => setNewPopup(null)}>Fechar</Button>
            </DialogContent>
          </Dialog>
        );
        setNewPopup(newPopup);

      })
      .catch(error => console.error('Erro ao acionar o método BandBuilder:', error));
  







  };

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseOut = () => {
    setIsMouseOver(false);
  };

  const handleChangeProfileClick = () => {

    const id = obterIdDaRota();
    const url = `/upload-pic?userID=${id}&operation=UPDATE`;
    navigate(url);

  };

  const navToMyProfile = () => {
    
    const id = obterIdDaRota();
    const url = `/myprofile?id=${id}`;
    navigate(url);

  };

  const handleSolicitationsClick = () => {

    const id = obterIdDaRota();
    const url = `/sentsolicitations?id=${id}`;
    navigate(url);

  }

  React.useEffect(() => {
    const handlePopstate = (event) => {
      event.preventDefault();

      if (event.state && event.state.logoff) {
        console.log('Usuário voltou após logoff');
        navigate('/');
      }
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [navigate]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div
        className='sidebar-profile-pic'
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <img src={imageUrl || ProfilePic} alt='Profile Pic' />
        {isMouseOver && (
          <div className='edit-icon'>
            <EditIcon onClick={handleChangeProfileClick} />
          </div>
        )}
      </div>

      <List className='home-lateral-menu'>
        <ListItem button className='home-lateral-menu-list-item' onClick={navToMyProfile}>
          <ListItemText primary="VER PERFIL"  />
        </ListItem>
        <ListItem button className='home-lateral-menu-list-item' onClick={handleCreateBandClick}>
          <ListItemText primary="CRIAR BANDA" />
        </ListItem>
        <ListItem button className='home-lateral-menu-list-item' onClick={handleBuildBandClick}>
          <ListItemText primary="BAND BUILD" />
          <WhatshotIcon style={{ marginLeft: 'auto' }} /> {/* Ícone de fogo */}
          <MusicNoteIcon /> {/* Ícone de instrumento musical */}
        </ListItem>
        <ListItem button className='home-lateral-menu-list-item' onClick={handleSolicitationsClick}>
          <ListItemText primary="SOLICITAÇÕES ENVIADAS" />
        </ListItem>
      </List>

      <div style={{ position: 'absolute', bottom: 16, width: '100%', textAlign: 'center' }}>
        <Button
          className='home-logoff-button'
          variant="contained"
          color="secondary"
          startIcon={<ExitToAppIcon />}
          onClick={handleLogoff}
        >
          Sair
        </Button>
      </div>

      {/* Popup para Band Build */}
      
      {newPopup}

      <Dialog open={openPopup} onClose={handlePopupClose}>
        <DialogTitle>INFORME AS HABILIDADES E O ESTILO QUE ESTÃO FALTANDO NA SUA BANDA QUE ENVIAREMOS SOLICITAÇÕES AOS MÚSICOS QUE CORRESPONDEM AO QUE VOCÊ PRECISA!</DialogTitle>
        <DialogContent>
          <TextField
            label="Habilidades (instrumentos separados por vírgula)"
            fullWidth
            value={instrumentNames}
            onChange={(e) => setInstrumentNames(e.target.value)}
            InputLabelProps={{
              style: { color: 'grey' }, // Defina a cor desejada
            }}
          />
          <TextField
            label="Estilo Musical"
            fullWidth
            value={musicStyle}
            onChange={(e) => setMusicStyle(e.target.value)}
            InputLabelProps={{
              style: { color: 'grey' }, // Defina a cor desejada
            }}
          />
          <Button onClick={handlePopupSubmit} className='sidebar-bandbuild-dialog-button'>
            Enviar
          </Button>
        </DialogContent>
      </Dialog>
    </Drawer>
  );
};

export default Sidebar;
