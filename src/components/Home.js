import React from 'react'
import { useState, useEffect, useRef } from 'react';
import API from '../service/API'
import FeedProfileCard from '../components/FeedProfileCard'
import NotificationItem from '../components/NotificationItem'
import ChatItem from '../components/ChatItem'
import Sidebar from '../components/SideBar';
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

import socketIOClient from 'socket.io-client/dist/socket.io.js';

export default function Home() {

    const [feedProfiles, setFeedProfiles] = useState([]);
    const [category, setCategory] = useState(1);
    const [searchValue, setSearchValue] = useState('all');
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElChat, setAnchorElChat] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [notificationStatus, setNotificationStatus] = useState({});
    const [chatPopoverOpen, setChatPopoverOpen] = useState(false);


    useEffect(() => {
        function getProfiles() {
            let url = `/usuario/search_profiles/${searchValue}/${category}/${obterIdDaRota()}`;

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

        API.get(`/usuario/get_contacts/${userId}`)
            .then((response) => {

                console.log(response.data)
                setContacts(response.data);
            })
            .catch((error) => {
                console.error('Erro ao obter solicitações de contato:', error);
            });

    }, []);

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

    // Função para abrir o popover de chat
    const openChatPopover = (event) => {
        setChatPopoverOpen(true);
        setAnchorElChat(event.currentTarget);
    };

    // Função para fechar o popover de chat
    const closeChatPopover = () => {
        setChatPopoverOpen(false);
        setAnchorElChat(null);
    };

    function solicitationAcceptReject(index, notificationId, button) {
        const userId = obterIdDaRota();

        API.put(`/usuario/accept_reject_solicitation/${userId}/${notificationId}/${button}`)
            .then((response) => {

                setNotificationStatus((prevStatus) => ({
                    ...prevStatus,
                    [index]: button,
                }));
            })
            .catch((error) => {
                console.error('Erro ao obter solicitações de contato:', error);
            });
    }

    function contactSendMessage(whatsapp) {
        // Formata o número de telefone removendo caracteres não numéricos
        const phoneNumber = whatsapp.replace(/\D/g, '');

        // Gera o link para o WhatsApp
        const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}`;

        // Abre o link em uma nova aba
        window.open(whatsappLink, '_blank');
    }

    // Função para abrir o menu lateral
    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

    // Função para fechar o menu lateral
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

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
                        <div className='home-searchbar-chat-icon' onClick={openChatPopover}>
                            <ChatBubbleIcon />
                        </div>
                    </div>

                    <div className='home-searchbar-menu-icon-container'>
                        <div className='home-searchbar-menu-icon' onClick={openSidebar}>
                            <MenuIcon />
                        </div>
                    </div>

                    <Sidebar open={isSidebarOpen} onClose={closeSidebar} />

                </div>
            </div>

            <div className='home-body'>

                <div className='home-feed'>
                    {feedProfiles
                        .filter(profile => (profile.user_id !== obterIdDaRota() || !profile.user_id) && (profile.band_id !== obterIdDaRota() || !profile.band_id))
                        .map(profile => (
                            <FeedProfileCard key={profile.user_id || profile.band_id} profile={profile} sentSolicsScreen="false"/>
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
                <div className='home-popover-notifications'>
                    {notifications.map((notification, index) => (
                        <NotificationItem
                            key={index}
                            user={notification}
                            instrument={notification.instrument}
                            onAccept={() => solicitationAcceptReject(index, notification.sender_id, 'A')}
                            onReject={() => solicitationAcceptReject(index, notification.sender_id, 'R')}
                            notificationItemStatus={notificationStatus[index]}
                        />
                    ))}

                </div>
            </Popover>

            <Popover
                open={chatPopoverOpen}
                anchorEl={anchorElChat}
                onClose={closeChatPopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >

                {contacts.map((contact, index) => (
                    <ChatItem
                        key={index}
                        user={contact}
                        instrument={contact.instrument}
                        onMessage={() => contactSendMessage(contact.whatsapp)}
                    />
                ))}
            </Popover>

        </>
    )
}