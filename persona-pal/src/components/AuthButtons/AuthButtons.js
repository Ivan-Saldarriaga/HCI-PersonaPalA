import React, { useContext } from 'react';
import AuthContext from '../../Contexts/authContext';
import './AuthButtons.css'

function AuthButtons() {
  const { user, handleSignIn, handleSignOut } = useContext(AuthContext);

  return (
    <div>
      {user ? (
        <div className="signed-in-section">
          <p>Hello, {user.displayName}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button className="sign-in-btn" onClick={handleSignIn}>Sign In with Google</button>
      )}
    </div>
  );
}

export default AuthButtons;
