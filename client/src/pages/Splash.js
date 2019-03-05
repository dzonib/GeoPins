import React from "react";
import { GoogleLogin } from 'react-google-login'


const Splash = () => {
  const onSuccess = googleUser => {
    // easy way to get token
    const idToken = googleUser.getAuthResponse().id_token

    console.log(idToken)
  }

  return <GoogleLogin 
    clientId="298398267602-2kth3ldbn0c6lldigosbjg87mgo0tq51.apps.googleusercontent.com" 
    onSuccess={onSuccess}
    isSignedIn={true}
  />
};

export default Splash;
