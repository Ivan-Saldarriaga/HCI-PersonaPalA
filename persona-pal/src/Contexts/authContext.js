import React from 'react';

const AuthContext = React.createContext({ user: null, loading: true });

export default AuthContext;