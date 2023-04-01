import './App.css';
import './insta-feed.css';
import './insta-lightbox.css';
import './blog.css';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak/Keycloak"
import { TemporaryAuthProvider } from './context/TemporaryAuthContext';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from './routing/Navigation';
import MainContent from './components/MainContent';

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: true,
        retry: false,
        staleTime: 5*60*1000,
      },
    },
});

function App() {
    return (
        <div className="App">
            <ReactKeycloakProvider authClient={keycloak}>
                <Router>
                    <QueryClientProvider client={queryClient}>
                            <TemporaryAuthProvider>
                                <Navigation />
                                <Routes>
                                    <Route path="*" element={ <MainContent/> }/>
                                </Routes>
                            </TemporaryAuthProvider>
                    </QueryClientProvider>
                </Router>
            </ReactKeycloakProvider>
        </div>
    );
}

export default App;
