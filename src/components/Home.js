import React from 'react'
import { useState, useEffect, useRef } from 'react';
import API from '../service/API'
import FeedProfileCard from '../components/FeedProfileCard'
import '../css/Home.css'
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

export default function Home() {

    const [feedProfiles, setFeedProfiles] = useState([]);
    const [category, setCategory] = useState(1);
    const [searchValue, setSearchValue] = useState('all');

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
                        <div className='home-searchbar-bell-icon'>
                        <NotificationsActiveIcon />
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
                    {feedProfiles.map(profile => (
                        <FeedProfileCard key={profile.user_id || profile.band_id} profile={profile} />
                    ))}
                </div>

            </div>
        </>
    )
}