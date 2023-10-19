import React from 'react'
import '../css/Home.css'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import MenuIcon from '@mui/icons-material/Menu';

export default function Home(){
    return(
        <>
            {/* <div className='home-body'> */}
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

                    <div >
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

            </div>
        </>
    )
}