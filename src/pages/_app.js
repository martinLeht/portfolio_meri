import Head from 'next/head';
import '../App.css';
import '../insta-feed.css';
import '../insta-lightbox.css';
import '../blog.css';
import { AuthProvider } from '../context/AuthContext';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from '../routing/Navigation';
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


export default function App() {
    return (
        <div className="App">
            <Head>
                <title>Meri Niemi</title>
                <meta name="author" content="Meri Niemi" />
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
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

