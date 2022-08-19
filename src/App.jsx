import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/dashboard/dashboard";
import Register from "./pages/register/register"
import Chat from "./components/chat/chat"
import Page404 from "./pages/404/page404";

import "./App.scss";
const isMobile = navigator.userAgentData.mobile;
console.log(navigator.userAgentData);

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inbox/*" element={<Chat />} />
                <Route path="/dashboard/*" element={<Home />} />
                <Route path="/auth" element={<Register />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;