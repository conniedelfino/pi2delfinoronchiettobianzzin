import { auth } from 'ruta/a/firebase/config';
import React from 'react';

function login (email, pass){
    auth.signInWithEmailAndPassword(email, pass)
    .then((response)=>{setLogin(true);
    })
    .catch(error => {
        setLoginError("Credenciales invalidas.")
    })
}

export default Login