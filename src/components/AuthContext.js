import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const predefinedUsers = [
  { username: 'saketh', password: '1234' },
  { username: 'user2', password: 'pass2' }
];

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3500/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        // Save the token or handle login
        localStorage.setItem("token", data.token)
        console.log(localStorage.getItem('token'))
        setCurrentUser(username);
        console.log('User logged in:', data);
      } else {
        console.error('Login error:', data.message);
      }
    } catch (error) {
      console.error('Server error:', error);
    }
  };

  const register = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3500/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        // Save the token or handle login
        localStorage.setItem("token", data.token)
        setCurrentUser(username);
        console.log('User registered:', data);
      } else {
        console.error('Registration error:', data.message);
      }
    } catch (error) {
      console.error('Server error:', error);
    }
  };
  

//   const login = (username, password) => {
//     console.log(username+" "+password);
    
//     const user = predefinedUsers.find(
//       u => u.username === username && u.password === password
//     );
//     if (user) {
//       setIsAuthenticated(true);
//       setCurrentUser(user.username);
//     } else {
//       setIsAuthenticated(false);
//       setCurrentUser(null);
//     }
//   };

  const logout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
