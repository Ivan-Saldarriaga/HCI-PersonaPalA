import React, { useContext } from 'react';
import AuthContext from '../../Contexts/authContext';

function AuthButtons() {
  const { user, handleSignIn, handleSignOut } = useContext(AuthContext);

  return (
    <div>
      {user ? (
        <>
          <p>Hello, {user.displayName}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <button onClick={handleSignIn}>Sign In with Google</button>
      )}
    </div>
  );
}

export default AuthButtons;
