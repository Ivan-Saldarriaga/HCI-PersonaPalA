//use the code from Tam 
import "./LandingPage.css"
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import loginButton from './assets/LandingPage/loginButton.svg';
import background from './assets/LandingPage/background.svg';
import subtitle from './assets/LandingPage/subtitle.svg';
import title from './assets/LandingPage/title.svg';
import team from './assets/LandingPage/team.svg';
import welcome from './assets/LandingPage/welcome.svg';

import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';


function LandingPage() {
    //render function will be done by Tam (hopefully)
    const handleGoogleLoginSuccess = (response) => {
        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            document.getElementById('root')
        );
    };


    const handleGoogleLoginFailure = (response) => {
        console.log(response);
        alert('Google login failed. Please try again.');
      };

    //need to combine the image 
    return (
        <GoogleOAuthProvider clientId="176425871896-2jfjino16tho0kvlrjfqmqc6qs32nfqa.apps.googleusercontent.com">
        <div className="LandingPage">
            <header className="App-header">
                <background-image src={background} className="background"  />
                <img src={welcome} className="welcome" />
                <img src={title} className="title" />
                <img src={subtitle} className="subtitle" />
                <img src={loginButton} className="loginButton" />
                <GoogleLogin
                    clientId="176425871896-2jfjino16tho0kvlrjfqmqc6qs32nfqa.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={handleGoogleLoginSuccess}
                    onFailure={handleGoogleLoginFailure}
                    cookiePolicy={'single_host_origin'}
                />
                <img src={team} className="team" />



                
            </header>
        </div>
        </GoogleOAuthProvider>
    );
}

export default LandingPage;