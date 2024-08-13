import "./App.css";
import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './components/AuthContext';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Events from "./components/Events";
import Schedule from "./components/Schedule";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Register from "./components/Register";

function App() {
  const { isAuthenticated} = useContext(AuthContext);
  
  return (
    <>
    
    {(localStorage.getItem('token')) ? (
        <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/schedule" element={<Schedule/>}/>
        </Routes>
        <Footer/>
      </Router>
      ) : (
        <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element = {<Login/>}/>
          <Route path="/register" element = {<Register/>}/>
        </Routes>
        <Footer/>
      </Router>
      )}
      {/* <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/schedule" element={<Schedule/>}/>
        </Routes>
      </Router> */}
    </>
  );
}

const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;
