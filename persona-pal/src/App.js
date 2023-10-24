import React, { useContext } from 'react';
import AuthProvider from './Contexts/AuthProvider';
import './App.css';
import PersonaSetup from './components/PersonaSetup/PersonaSetup';


function App() {
  return (
    <AuthProvider>
      <div>
        <PersonaSetup/>
      </div>
    </AuthProvider>
  );
}
//npm i multiselect-react-dropdown --save

export default App;
