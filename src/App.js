import './App.css';
import './insta-feed.css';
import './insta-lightbox.css';
import './blog.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './contents/login/Login';
import NavBar from './components/NavBar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route path="/">
                <NavBar />
                <Header />
                <MainContent />
                <Footer />
            </Route> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;
