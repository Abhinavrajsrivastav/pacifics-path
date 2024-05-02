import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Vision from './Components/Welcome/Pages/Vision-Page/Vision';
import Features from './Components/Welcome/Pages/Featues-Page/Features';
import HowWork from './Components/Welcome/Pages/How-Work-Page/HowWork';
import Profile from './UserProfile/Profile/Profile';
import { AuthProvider } from './Components/Context/AuthProvider';
import { AuthContext } from './Components/Context/AuthProvider';

function App() {
  

  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Vision />
              <Features />
              <HowWork />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path={`/profile/`} element={<Profile />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
