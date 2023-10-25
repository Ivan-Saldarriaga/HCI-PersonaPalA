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
import fullTitle from './assets/LandingPage/title0.svg';
import AuthContext from './Contexts/authContext';
import { useNavigate } from 'react-router-dom';

import './App.css';
import { useContext } from "react";


function LandingPage() {
    const { user, handleSignIn, handleSignOut } = useContext(AuthContext);
    const navigate = useNavigate();

    //need to combine the image 
    return (
        <div className="LandingPage">
            <img src={fullTitle} className="fullTitle" />
            <button className="loginButton" onClick={() => navigate('/persona')}>Generate Characters!</button>
            <img src={team} className="team" />
        </div>
    );
}

export default LandingPage;