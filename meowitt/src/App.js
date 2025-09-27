import logo from './logo.svg';
import './App.css';
import {render} from "@testing-library/react";
import HomePage from "./components/HomePage";


import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import PrivacyStatement from "./components/PrivacyStatement";



const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/dashboard' element={<Home />} />
                    <Route path='/account' element={<UserProfile/>} />
                    <Route path='/terms' element={<PrivacyStatement/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;

