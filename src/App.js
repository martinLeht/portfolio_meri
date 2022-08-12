import './App.css';
import './insta-feed.css';
import './insta-lightbox.css';
import './blog.css';
import { AuthProvider } from './context/AuthContext';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from './routing/Navigation';
import Login from './contents/login/Login';
import MainContent from './components/MainContent';

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 5*60*1000,
      },
    },
});


function App() {
  return (
    <div className="App">
      <Router>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Navigation />
                <Routes>
                    <Route exact path="/login" element={ <Login /> } />
                    <Route path="*" element={ <MainContent/> }/>
                </Routes>
            </AuthProvider>
        </QueryClientProvider>
      </Router>
    </div>
  );
}

export default App;
