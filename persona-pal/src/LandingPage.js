import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from 'react-google-login';

function LandingPage() {
    const handleGoogleLoginSuccess = (response) => {
        React.render(
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

    return (
        <div className="LandingPage">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Welcome to PersonaPal</h1>
                <p>
                    Your personal assistant for managing your daily tasks and schedule.
                </p>
                <GoogleLogin
                    clientId="176425871896-2jfjino16tho0kvlrjfqmqc6qs32nfqa.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={handleGoogleLoginSuccess}
                    onFailure={handleGoogleLoginFailure}
                    cookiePolicy={'single_host_origin'}
                />
            </header>
        </div>
    );
}

ReactDOM.render(
    <LandingPage />,
    document.getElementById('root')
);