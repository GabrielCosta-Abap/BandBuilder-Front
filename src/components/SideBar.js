import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import '../css/SideBar.css'

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleLogoff = () => {

    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (isLocalhost) {
      window.location.href = 'http://localhost:3000';
    } else {
      window.location.href = 'https://band-builder-front.vercel.app/';
    }
    
  };

  React.useEffect(() => {
    const handlePopstate = (event) => {
      event.preventDefault()
      // Verifique se o evento de popstate é devido ao marcador de logoff
      if (event.state && event.state.logoff) {
        // Implemente a lógica desejada após o logoff
        console.log('Usuário voltou após logoff');
        // Exemplo: Redirecionar novamente para a página de login
        navigate('/');
      }
    };

    // Adicione um ouvinte para o evento popstate
    window.addEventListener('popstate', handlePopstate);

    // Remova o ouvinte ao desmontar o componente
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [navigate]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      {/* <List className='home-lateral-menu'>
        <ListItem button>
          <ListItemText primary="Opção 1" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Opção 2" />
        </ListItem>
      </List> */}

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
    </Drawer>
  );
};

export default Sidebar;
