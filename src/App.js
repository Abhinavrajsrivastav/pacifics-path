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
import Categories from './Categories/Categories';
import PopupForm from './Categories/PopopForm';
import SelfLearn from './Pages/SelfLearnign/SelfLearn';
import WebResponses from './Pages/ChatBot/Queries/Results/Web/WebResponses';
import Gemini from './Pages/ChatBot/Queries/Results/Ai/Gemini';
import Result from './Pages/ChatBot/Queries/Results/Result';
import Videos from './Pages/ChatBot/Queries/Results/Video/Videos';
import Books from './Pages/Books/Books';
import GitHubProfile from './Pages/Socials/GitHub/GitHubProfile';
import Mate from './Pages/Socials/FindMate/Mate';

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/selfLearn" element={<SelfLearn />} />
          <Route path="/self-learn/response" element={<Result />} />
          <Route path="/self-learn/response/Videos" element={<Videos />} />
          <Route path="/read-books" element={<Books />} />
          <Route path="/github-profile" element={<GitHubProfile />} />
          <Route path="/git-mate" element={<Mate />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
