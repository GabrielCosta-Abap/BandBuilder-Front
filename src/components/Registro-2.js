
import { useState, useEffect } from 'react';

import Formato from '../assets/formato-violao.svg';

import { motion } from 'framer-motion';

import '../css/Register.css';

import API from '../service/API';



function Register2() {
  const musicalGenreOptions = ["Rock", "MPB", "Folk", "Sertanejo", "Indie"];
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [dados, setDados] = useState([{
    INSTRUMENTS: '',
    MUSICAL_EXPERIENCE: '',
  }]);
  const [YOUTUBE_LINK, setYoutubeLink] = useState("");
  const [DESCRIPTION, setDescription] = useState("");
  const [IMG_URL, setImgUrl] = useState("");
  const [MUSICAL_GENRE, setMusicalGenre] = useState("");
  const [userData, setUserData] = useState({
    NAME: '',
    EMAIL: '',
    BIRTH_DATE: '',
    GENDER: '',
    PHONE: '',
    CITY: '',
    PASSWORD: ''
  });
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const data = JSON.parse(queryParams.get('data'));

    if (data) {
      setUserData({
        NAME: data.firstName,
        EMAIL: data.email,
        BIRTH_DATE: data.born_date,
        GENDER: data.gender,
        PHONE: data.phone,
        CITY: data.city,
        PASSWORD: data.password
      });
    }
  }, []);

  const handleGenreChange = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };
  

  const handleInstrumentoChange = (e, index) => {
    const novosDados = [...dados];
    novosDados[index].INSTRUMENTS = e.target.value;
    setDados(novosDados);
  };

  const handleExperienciaChange = (e, index) => {
    const novosDados = [...dados];
    novosDados[index].MUSICAL_EXPERIENCE = e.target.value;
    setDados(novosDados);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      YOUTUBE_LINK,
      DESCRIPTION,
      IMG_URL,
      MUSICAL_GENRE: selectedGenres.join(", "),
    };

    const combinedData = {
      ...userData,
      instrumentData: dados,
      ...data,
    };
    console.log(combinedData);


    API.post('/usuario/insert_user', combinedData) // Usar API.post como no componente Login
      .then(response => {
        console.log('Resposta da API:', response);
      })
      .catch(error => {
        console.error('Erro ao enviar os dados para a API:', error);
      });
  };

  const adicionarCampo = () => {
    setDados([...dados, { INSTRUMENTS: '', MUSICAL_EXPERIENCE: '' }]);

  };

  const removerCampo = (index) => {
    const novosDados = [...dados];
    novosDados.splice(index, 1);
    setDados(novosDados);
  };

  return (
    <motion.div className='container-register2' initial={{ x: -400 }} animate={{ x: 0 }}>
      <div className='formato-violao-svg2'>
        <img src={Formato} alt='Formato de Violão' />
      </div>

      <div className='wrap-register2'>
        <div className='form-group'>
          <div className='wrap-input-register2 input-form-youtube'>
            <input
              className={YOUTUBE_LINK !== "" ? 'has-val2 input-register2 js_input_youtube_link' : 'input-register2'}
              type='text'
              value={YOUTUBE_LINK}
              onChange={(e) => setYoutubeLink(e.target.value)}
            />
            <span className='focus-input-register2' data-placeholder='Link do Youtube'></span>
          </div>
          <div className='wrap-input-register2 input-form-description'>
            <textarea
              className={DESCRIPTION !== "" ? 'has-val2 text-area-description js_input_description' : 'text-area-description input-register2'}
              type='text'
              maxLength={250}
              value={DESCRIPTION}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className='focus-input-register2 focus-input-register2-description' data-placeholder='Descrição'></span>
          </div>
          <div className='wrap-input-register2 input-form-img'>
            <input
              className={IMG_URL !== "" ? 'has-val2 input-register2 js_input_img-url' : 'input-register2'}
              type='text'
              value={IMG_URL}
              onChange={(e) => setImgUrl(e.target.value)}
            />
            <span className='focus-input-register2' data-placeholder='URL da foto de perfil'></span>
          </div>
          <div className='wrap-input-register2 input-register2-gender-musical'>
            {musicalGenreOptions.map((genre) => (
              <label key={genre} className="checkbox-label">
                <input
                  className='has-val2'
                  type='checkbox'
                  value={genre}
                  checked={selectedGenres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                />
                {genre}
              </label>
            ))}
            <span className='focus-input-register2 focus-input-register2-gender checkbox-checkmark' data-placeholder='Gênero musical'></span>
          </div>
        </div>
        {dados.map((dado, index) => (
          <form className='register-form2' key={index} onSubmit={(e) => handleSubmit(e, index)}>
            <div className='select-menu'>
              <select
                className='select-btn'
                value={dado.instruments}
                onChange={(e) => handleInstrumentoChange(e, index)}
                required
              >
                <option disabled value=''>Selecione o instrumento</option>
                <option value='Violão'>Violão</option>
                <option value='Bateria'>Bateria</option>
                <option value='Guitarra'>Guitarra</option>
                <option value='Baixo'>Baixo</option>
                <option value='Teclado'>Teclado</option>
                <option value='Voz'>Voz</option>
              </select>
            </div>
            <div className='wrap-input-register2 input-radio2'>
              <input
                type='radio'
                name={`MUSICAL_EXPERIENCE-${index}`}
                id={`iniciante-${index}`}
                value='iniciante'
                checked={dado.MUSICAL_EXPERIENCE === 'iniciante'}
                onChange={(e) => handleExperienciaChange(e, index)}
              />
              <label className='tab2' htmlFor={`iniciante-${index}`}>
                Iniciante
              </label>
              <input
                type='radio'
                name={`MUSICAL_EXPERIENCE-${index}`}
                id={`intermediario-${index}`}
                value='intermediario'
                checked={dado.MUSICAL_EXPERIENCE === 'intermediario'}
                onChange={(e) => handleExperienciaChange(e, index)}
              />
              <label className='tab2' htmlFor={`intermediario-${index}`}>
                Intermediário
              </label>
              <input
                type='radio'
                name={`MUSICAL_EXPERIENCE-${index}`}
                id={`avancado-${index}`}
                value='avancado'
                checked={dado.MUSICAL_EXPERIENCE === 'avancado'}
                onChange={(e) => handleExperienciaChange(e, index)}
              />
              <label className='tab2' htmlFor={`avancado-${index}`}>
                Avançado
              </label>
              <input
                type='radio'
                name={`MUSICAL_EXPERIENCE-${index}`}
                id={`profissional-${index}`}
                value='profissional'
                checked={dado.MUSICAL_EXPERIENCE === 'profissional'}
                onChange={(e) => handleExperienciaChange(e, index)}
              />
              <label className='tab2' htmlFor={`profissional-${index}`}>
                Profissional
              </label>
              <span className='glider2'></span>
            </div>

            <button type='button' className='remove-field' onClick={() => removerCampo(index)}>Remover</button>
          </form>
        ))}

        <div className='fin-btns'>
          <button onClick={adicionarCampo} className='add-more'>+</button>
          <button type='submit' onClick={handleSubmit} className='sub-form'>Enviar</button>
        </div>
      </div>
    </motion.div>
  );
}

export default Register2;
