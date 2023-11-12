import React, { useEffect, useState } from 'react';
import UserProfile from '../components/UserProfile';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import axios from 'axios';
import '../style/UserProfilePage.css';

const userURL = 'http://localhost:3008';

function collab() {

  return (
    <head> 
      //Firebase
      <script src="https://www.gstatic.com/firebasejs/7.6.2/firebase.js"></script>


      //CodeMirror
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.17.0/codemirror.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.17.0/codemirror.css" />

      //firepad
      <link rel="stylesheet" href="https://firepad.io/releases/v1.5.10/firepad.css" />
      <script src="https://firepad.io/releases/v1.5.10/firepad.min.js"></script>
    </head>

    
  );
}

export default collab;
