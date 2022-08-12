import { Box, Toolbar } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import Footer from "../footer/footer";

function Main() {
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 2, backgroundColor: '#F9FAFB' }}>
            <Footer />            
            <Routes>
                {/* <Route path="/team" element={<Footer />} /> */}
            </Routes>
        </Box>
    );
}
export default Main;
