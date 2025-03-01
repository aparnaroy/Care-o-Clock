// import { useState } from 'react';
import logo from './assets/full-logo.png';
import './App.css';
import ChatBot from './Chatbot';
import NavBar from './NavBar';

const Home = () => {
    return (
        <div>
            <a href="https://vite.dev" target="_blank">
                <img src={logo} className="logo" alt="Vite logo" />
            </a>
        
            <ChatBot/>
            <NavBar/>
        </div>
    );
};

export default Home;