import { Box, Table, Toolbar } from "@mui/material";
import { Routes, Route, Outlet } from "react-router-dom";

import Footer from "../../components/footer/footer";
import Overview from "../../components/overview/overview";
import Projects from "../../pages/projects/projects";
import Docs from "../../pages/docs/docs"
import Help from "../../pages/help/help"


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
                <Route path="projects" element={<Projects />} />
                <Route path="docs" element={<Docs />} />
                <Route path="help" element={<Help />} />
                <Route path="help" element={<Help />} />
                <Route path="components" element={<h1>Components</h1>} />
                <Route path="billing" element={<h1>Billing</h1>} />
                <Route path="invoice" element={<h1>Invoice</h1>} />
                <Route path="team" element={<h1>Team</h1>} />
                <Route path="calendar" element={<h1>Calendar</h1>} />
            </Routes>
            <Footer />
            <Outlet />
        </Box>
    );
}
export default Main;
