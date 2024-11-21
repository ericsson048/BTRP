// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
function Login() {
  // const navigate = useNavigate();
  const responseGoogle = (response: { profileObj: { name: string; email: string } }) => {
    const { profileObj } = response;
    // Envoi des données à votre backend pour l'enregistrement
    axios.post('http://localhost:3500/users', {
      name: profileObj.name,
      email: profileObj.email,
    })
    .then(res => {
      // Gérer la réponse après l'enregistrement
      console.log(res.data);
    })
    .catch(err => {
      console.error(err);
    });
  };

  return (
      <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID as string}
        buttonText="Se connecter avec Google"
        onSuccess={(response: any) => responseGoogle(response)}
        onFailure={(response: any) => responseGoogle(response)}
        cookiePolicy={'single_host_origin'}
      />
  )
}

export default Login