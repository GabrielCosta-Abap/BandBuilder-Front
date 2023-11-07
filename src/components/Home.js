import React from 'react'
import { useState, useEffect, useRef } from 'react';
import API from '../service/API'
import FeedProfileCard from '../components/FeedProfileCard'
import NotificationItem from '../components/NotificationItem'
import '../css/Home.css'
import { obterIdDaRota } from '../utils'
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import MenuIcon from '@mui/icons-material/Menu';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Popover from '@mui/material/Popover';

export default function Home() {

    const [feedProfiles, setFeedProfiles] = useState([]);
    const [category, setCategory] = useState(1);
    const [searchValue, setSearchValue] = useState('all');
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        function getProfiles() {
            let url = `/usuario/search_profiles/${searchValue}/${category}`;

            API.get(url)
                .then((response) => {
                    console.log(response.data)
                    console.log(url)
                    setFeedProfiles([]);
                    setFeedProfiles(response.data);
                })
                .catch((err) => {
                    console.error("Ops! Ocorreu um erro" + err);
                });
        }

        getProfiles();

    }, [category, searchValue]);

    useEffect(() => {

        const userId = obterIdDaRota();

        API.get(`/usuario/get_contact_solics/${userId}`)
            .then((response) => {

                console.log(response.data)
                setNotifications(response.data);
            })
            .catch((error) => {
                console.error('Erro ao obter solicitações de contato:', error);
            });
    }, []); // O array vazio [] garante que o useEffect seja executado apenas uma vez, após a montagem do componente.

    function handleCategoryChange(event) {
        setFeedProfiles([]);

        const { value } = event.target;
        setCategory(value);
    }

    function handleSearchChange(event) {
        setFeedProfiles([]);

        const { value } = event.target;
        setSearchValue(value || 'all');
    }

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handlePopoverClose = () => {
        setAnchorEl(null);
    };


    function handleAccept(notificationId) {
        // Lógica de aceitação
        window.alert('Aceitou');
    }

    function handleReject(notificationId) {
        // Lógica de rejeição
        window.alert('Rejeitou');
    }

    return (
        <>

            <div className='home-search-bar'>

                <Select className='home-select-band-user'
                    labelId="home-select-band-user"
                    id="home-select-band-user"
                    value={category}
                    // defaultValue={1}
                    label="Filtro"
                    onChange={handleCategoryChange}
                >
                    <MenuItem value={1}>Bandas e Músicos</MenuItem>
                    <MenuItem value={2}>Bandas</MenuItem>
                    <MenuItem value={3}>Músicos</MenuItem>
                </Select>

                <FormControl sx={{ m: 1, width: '80ch' }} variant="outlined">

                    <InputLabel size="small" htmlFor="outlined-adornment-search">Pesquisar Nome, Instrumento ou Gênero musical</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-search"
                        className='outlined-adornment-search'
                        onChange={handleSearchChange}
                        size="small"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Buscar"
                                    edge="end"
                                //   onClick={handleClickShowPassword}
                                //   onMouseDown={handleMouseDownPassword}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Buscar"
                    />

                </FormControl>

                <div className='home-navbar-menu'>
                    <div className="home-searchbar-notification-bell-container">
                        <div className='home-searchbar-bell-icon' onClick={handlePopoverOpen}>
                            <NotificationsActiveIcon />
                            {notifications.length > 0 && (
                                <span className="notification-counter">{notifications.length}</span>
                            )}
                        </div>
                    </div>


                    <div className="home-searchbar-chat-icon-container">
                        <div className='home-searchbar-chat-icon'>
                            <ChatBubbleIcon />
                        </div>
                    </div>

                    <div className='home-searchbar-menu-icon-container'>
                        <div className='home-searchbar-menu-icon'>
                            <MenuIcon />
                        </div>
                    </div>
                </div>
            </div>

            <div className='home-body'>

                <div className='home-feed'>
                    {feedProfiles
                        .filter(profile => (profile.user_id !== obterIdDaRota() || !profile.user_id) && (profile.band_id !== obterIdDaRota() || !profile.band_id))
                        .map(profile => (
                            <FeedProfileCard key={profile.user_id || profile.band_id} profile={profile} />
                        ))
                    }
                </div>


            </div>

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {/* Conteúdo do popover */}
                <div className='home-popover-notifications'>
                    {notifications.map((notification, index) => (
                        <NotificationItem
                            key={index}
                            user={notification}
                            instrument={notification.instrument}
                            onAccept={() => handleAccept(notification.senderId)}
                            onReject={() => handleReject(notification.senderId)}
                        />
                    ))}
                </div>
            </Popover>



        </>
    )
}