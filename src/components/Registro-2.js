
import { useState, useEffect } from 'react';

import Formato from '../assets/formato-violao.png';

import Arrow from '../assets/arrow.svg';

import { motion } from 'framer-motion';

import '../css/Register.css';

import API from '../service/API';

import { Link } from "react-router-dom";

import '../index';

import Select from 'react-select';


function Register2() {
  const [dados, setDados] = useState([{
    INSTRUMENTS: '',
    MUSICAL_EXPERIENCE: '',
  }]);
  const [YOUTUBE_LINK, setYoutubeLink] = useState(localStorage.getItem('YOUTUBE_LINK') || "");
  const [DESCRIPTION, setDescription] = useState(localStorage.getItem('DESCRIPTION') || "");
  const [MUSICAL_GENRE, setMusicalGenre] = useState(localStorage.getItem('MUSICAL_GENRE') || "");
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
      MUSICAL_GENRE
    };

    const combinedData = {
      ...userData,
      instrumentData: dados,
      ...data,
    };
    console.log(combinedData);
    localStorage.setItem('YOUTUBE_LINK', YOUTUBE_LINK);
    localStorage.setItem('DESCRIPTION', DESCRIPTION);
    localStorage.setItem('MUSICAL_GENRE', MUSICAL_GENRE);

    API.post('/usuario/insert_user', combinedData) // Usar API.post como no componente Login
      .then(response => {
        console.log('Resposta da API:', response);
        const userID = response.data.user_id;
        localStorage.clear();
        // Redirecionar para a próxima página com o ID do usuário
        window.location = `/upload-pic?userID=${userID}&operation=CREATE`;
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

  const instrumentOptions = [
    { value: 'Violao', label: 'Violão' },
    { value: 'Bateria', label: 'Bateria' },
    { value: 'Guitarra', label: 'Guitarra' },
    { value: 'Baixo', label: 'Baixo' },
    { value: 'Teclado', label: 'Teclado' },
    { value: 'Ukulele', label: 'Ukulele' },
    { value: 'Saxofone', label: 'Saxofone' },
    { value: 'Cavaquinho', label: 'Cavaquinho' },
    { value: 'Tambor', label: 'Tambor' },
    { value: 'Gaita', label: 'Gaita' },
    { value: 'Sanfona', label: 'Sanfona' },
    { value: 'Voz', label: 'Voz' },
  ];

  const [selectedInstrument, setSelectedInstrument] = useState(null);

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
          <div className='wrap-input-register2 input-register2-gender-musical'>
            <input
              className={MUSICAL_GENRE !== "" ? 'has-val2 input-register2 js_input_musical-genre' : 'input-register2'}
              type='text'
              value={MUSICAL_GENRE}
              onChange={(e) => setMusicalGenre(e.target.value)}
            />
            <span className='focus-input-register2 focus-input-musical-genre' data-placeholder='Gênero musical'></span>
          </div>
        </div>
        {dados.map((dado, index) => (
          <form className='register-form2' key={index} onSubmit={(e) => handleSubmit(e, index)}>
            <div className='select-menu'>
              <Select
                options={instrumentOptions}
                value={instrumentOptions.find(option => option.value === dado.INSTRUMENTS)} // Encontrar a opção correspondente ao valor atual
                onChange={(selectedOption) => {
                  handleInstrumentoChange({ target: { value: selectedOption.value } }, index);
                  setSelectedInstrument(selectedOption);
                }}
                placeholder='Selecione o instrumento'
                isSearchable
                styles={{
                  // Exemplo de estilo usando o objeto 'styles'
                  control: (provided, state) => ({
                    ...provided,
                    borderRadius: '30px',
                  }),
                  // Adicione mais estilos conforme necessário
                }}
              />
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
          <div className='btns1'>
            <Link className='register-form-btn register-form-btn2' to={'../register'}><img src={Arrow} /></Link>
          </div>
          <div className='btns2'>
            <button onClick={adicionarCampo} className='add-more'>+</button>
            <button type='submit' onClick={handleSubmit} className='sub-form'>Enviar</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Register2;
