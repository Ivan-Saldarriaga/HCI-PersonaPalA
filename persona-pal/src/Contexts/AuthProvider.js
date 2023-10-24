import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './authContext.js';
import { auth, googleProvider } from './../firebase/config.js'; // your firebase config file
import { onAuthStateChanged, signInWithPopup, signOut  } from 'firebase/auth';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // For initial load

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);  // Set loading to false once we get the user state
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleSignIn, handleSignOut }}>
      {!loading && children} 
      {/* You can choose to not render children until you've checked user state. This prevents flicker in UI for cases like auto-login. */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

