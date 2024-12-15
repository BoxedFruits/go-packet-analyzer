import React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App'
import { HashRouter, Routes, Route } from "react-router-dom";
import Capture from './apps/capture';


const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <HashRouter basename={"/"}>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/capture" element={<Capture />} />
            </Routes>
        </HashRouter>
    </React.StrictMode>
)
