import ProfilePic from '../assets/no-profile-pic-avatar.png';
import React, { useEffect, useState } from 'react';
import { firebaseConfig } from '../service/Firebase.js';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { obterIdDaRota } from '../utils'

export default function MyProfile() {

   return <h1>Criar aqui o perfil do usuário que estiver logado. ID está contido na URL, é possível obtê-lo através da função obterIdDaRota, do arquivo utils.js</h1>

}
