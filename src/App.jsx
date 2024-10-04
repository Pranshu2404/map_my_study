import React from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Activities from './components/Activities';
import ActivityDetails from "./pages/ActivityDetails";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <div className="flex animate-fadeIn duration-1000">
              <Sidebar />
              <MainContent />
            </div>
          } 
        />
        <Route path="/MainContent" element={<MainContent />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Activities" element={<Activities />} />
        <Route path="/Signup" element={<SignupPage />} />
        <Route path="/activities/:activityId" element={<ActivityDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
