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

export default function Home(){

    const [feedProfiles, setFeedProfiles ] = useState([]);

    let url = '/usuario/list_users'

    API.get(url)
    .then((response) => {
        console.log(response.data)
        setFeedProfiles(response.data);
        
    })
    .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        window.alert("OCORREU UM ERRO AO BUSCAR DADOS DE USUÁRIO!")
    });

    return(
        <>
            <div className='home-search-bar'>

                <FormControl sx={{ m: 1, width: '80ch' }} variant="outlined">

                    <InputLabel size="small" htmlFor="outlined-adornment-search">Buscar</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-search"
                        className='outlined-adornment-search'
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

                <div className='home-searchbar-menu-icon'>
                    <IconButton 
                                aria-label="Buscar"
                                edge="end"
                                //   onClick={handleClickShowPassword}
                                //   onMouseDown={handleMouseDownPassword}
                                >
                                    <MenuIcon />
                    </IconButton>
                </div>
            
            </div>

            <div className='home-body'>

                <div className='home-feed'>
                    { feedProfiles.map(profile => (
                        <FeedProfileCard key={profile.user_id} profile={profile} />
                        ))} 
                </div>

            </div>
        </>
    )
}