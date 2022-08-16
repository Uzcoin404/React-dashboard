import { Box, Table, Toolbar } from "@mui/material";
import { Routes, Route, Outlet } from "react-router-dom";

import Footer from "../footer/footer";
import Overview from "../overview/overview";
import Projects from "../../pages/projects/projects";
import Chat from "../chat/chat"
import Register from "../../pages/register/register"
import Docs from "../../pages/docs/docs"
import Help from "../../pages/help/help"
import Register from "../../pages/register/register"


function Main() {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 2,
                backgroundColor: "#F9FAFB",
                minHeight: "calc(100vh - 64px)",
                marginTop: "64px",
                position: "relative",
            }}
        >
            <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/auth" element={<Register />} />
            </Routes>
            <Footer />
            <Outlet />
        </Box>
    );
}
export default Main;
