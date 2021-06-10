import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
