// import { useState } from 'react';
import './App.css';
import ChatBot from './Chatbot';
import NavBar from './NavBar';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome, NAME!</h1>
            <p>How can I help you today?</p>
            <ChatBot/>
            <NavBar/>
        </div>
    );
};

export default Home;