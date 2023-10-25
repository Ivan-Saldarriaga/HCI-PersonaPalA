import React, { useContext } from 'react';
import AuthProvider from './Contexts/AuthProvider';
import './App.css';
import PersonaSetup from './components/PersonaSetup/PersonaSetup';
import LandingPage from './LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/persona" element={<PersonaSetup/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
//npm i multiselect-react-dropdown --save

export default App;
