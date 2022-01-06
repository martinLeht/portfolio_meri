import './App.css';
import './insta-feed.css';
import './insta-lightbox.css';
import './blog.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from './routing/Navigation';
import Login from './contents/login/Login';
import MainContent from './components/MainContent';


function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
            <Route exact path="/login" element={ <Login /> } />
            <Route path="*" element={ <MainContent/> }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
