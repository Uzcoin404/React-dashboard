import { Box, Table, Toolbar } from "@mui/material";
import { Routes, Route, Outlet } from "react-router-dom";

import Footer from "../footer/footer";
import Overview from "../overview/overview";
import Tables from "../tables/tables";

function Main() {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 2,
                backgroundColor: "#F9FAFB",
                height: "calc(100vh - 64px)",
                marginTop: "64px",
                position: "relative",
            }}
        >
            <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/tables" element={<Tables />} />
            </Routes>
            <Footer />
            <Outlet />
        </Box>
    );
}
export default Main;
