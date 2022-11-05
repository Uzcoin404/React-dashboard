import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserContext } from "./context/user";
import Home from "./pages/dashboard/dashboard";
import Register from "./pages/register/register"
import Chat from "./components/chat/chat";
import Page404 from "./pages/404/page404";
import ChatLogin from "./components/chatLogin/chatLogin";

import "./App.scss";
const isMobile = navigator.userAgentData.mobile;

function App() {

    const {user } = useContext(UserContext);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route exact path="/inbox/*" element={user ? <Chat /> : <ChatLogin />} />
                <Route path="/dashboard/*" element={<Home />} />
                <Route path="/auth" element={<Register />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;