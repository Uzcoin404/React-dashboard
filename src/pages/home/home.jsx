import React, { useState } from "react";

import { Box, CssBaseline } from "@mui/material";
import pages from "../../components/pages";

import Nav from "../../components/nav/nav";
import Aside from "../../components/aside/aside";
import Main from "../../components/main/main";

function Home() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const MenuToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Nav MenuToggle={MenuToggle} pages={pages} />
            <Aside
                mobileOpen={mobileOpen}
                MenuToggle={MenuToggle}
                pages={pages}
            />
            <Main />
        </Box>
    );
}
export default Home;
