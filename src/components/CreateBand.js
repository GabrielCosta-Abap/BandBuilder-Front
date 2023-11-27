import React, { useEffect, useState } from 'react';
import '../css/CreateBand.css'
import API from '../service/API' 
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

export default function CreateBand() {
    const navigate = useNavigate();
    const [userOptions, setUserOptions] = useState([]);
    const [searchUserName, setSearchUserName] = useState('all');

    const [bandInfo, setBandInfo] = useState({
        name: '',
        facebook: '',
        youtube: '',
        instagram: '',
        whatsapp: '',
        city: '',
        musical_genre: '',
        description: '',
        user_ids: []
    });

    useEffect(() => {

        loadUserOptions();
    }, []); 

    const loadUserOptions = () => {

        if (!searchUserName || searchUserName == '') {
            setSearchUserName('all')
        }

        console.log(bandInfo)

        API.get(`/usuario/search_profiles/${searchUserName}/3`)
            .then(response => {
                const options = response.data.map(user => ({
                    value: user.user_id,
                    label: user.name
                }));
                setUserOptions(options);
            })
            .catch(error => {
                console.error("Erro ao buscar usuários: " + error);
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setBandInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleUserSearchChange = (inputValue) => {
        setSearchUserName(inputValue);
        loadUserOptions();
    };

    const handleUserSelect = (selectedUsers) => {
        const selectedUserIds = selectedUsers.map(user => user.value);

        const params = new URLSearchParams(window.location.search);
        const userID = params.get('userID');
        
        if (userID) {
            selectedUserIds.push(userID);
        }
    
        setBandInfo((prevInfo) => ({
            ...prevInfo,
            user_ids: selectedUserIds,
        }));
    };
     

    const handleSubmit = (event) => {
        event.preventDefault();

        API.post("/bands/insert_band", bandInfo)
        .then((response) => {

            const url = `/upload-pic?userID=${response.data.band_id}&operation=CREATE`;
            navigate(url);
            
        })
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            window.alert("Ocorreu um erro! Verifique se todos os campos foram preenchidos corretamente!")
        });        

    };

    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          background: '#444', // Cor de fundo
          borderColor: '#555', // Cor da borda
        }),
        menu: (provided, state) => ({
          ...provided,
          backgroundColor: '#444', // Cor de fundo do menu
          color: '#fff', // Cor do texto do menu
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#555' : '#444', // Cor de fundo da opção selecionada ou não selecionada
          color: state.isSelected ? '#fff' : '#ccc', // Cor do texto da opção selecionada ou não selecionada
        }),
      };

    return (
        <div className='form-creatreband-body'>
            <form className="dark-form" onSubmit={handleSubmit}>

            <label>
                    Membros da banda:
                    <Select
                        isMulti
                        name="user_ids"
                        options={userOptions}
                        onInputChange={handleUserSearchChange}
                        onChange={handleUserSelect}
                        styles={customStyles} 

                    />
                </label>                

                <label>
                    Nome da Banda:
                    <input type="text" name="name" value={bandInfo.name} onChange={handleChange} />
                </label>

                <label>
                    Link do Facebook:
                    <input type="text" name="facebook" value={bandInfo.facebook} onChange={handleChange} />
                </label>

                <label>
                    Link do YouTube:
                    <input type="text" name="youtube" value={bandInfo.youtube} onChange={handleChange} />
                </label>

                <label>
                    Link do Instagram:
                    <input type="text" name="instagram" value={bandInfo.instagram} onChange={handleChange} />
                </label>

                <label>
                    Whatsapp da Banda:
                    <input type="text" name="whatsapp" value={bandInfo.whatsapp} onChange={handleChange} />
                </label>

                <label>
                    Cidade:
                    <input type="text" name="city" value={bandInfo.city} onChange={handleChange} />
                </label>

                <label>
                    Gênero Musical:
                    <input type="text" name="musical_genre" value={bandInfo.musical_genre} onChange={handleChange} />
                </label>

                <label>
                    Descrição:
                    <textarea name="description" value={bandInfo.description} onChange={handleChange} />
                </label>


                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
