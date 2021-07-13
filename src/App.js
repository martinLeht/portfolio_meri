import './App.css';
import './insta-feed.css';
import './insta-lightbox.css';
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from './components/NavBar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Header />
        <MainContent />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
