import React, { useState } from "react";

import { Box } from "@mui/material";

import Nav from "../../components/nav/nav";
import Aside from "../../components/aside/aside";
import Main from "../../components/main/main";

function Home() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const MenuToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const pages = [
        { to: "/", title: "Dashboard" },
        { to: "/team", title: "Team" },
        { to: "/projects", title: "Projects" },
        { to: "/calendar", title: "Calendar" },
    ];

    return (
        <>
            <Nav MenuToggle={MenuToggle} pages={pages} />
            <Box sx={{ display: "flex" }}>
                <Aside
                    mobileOpen={mobileOpen}
                    MenuToggle={MenuToggle}
                    pages={pages}
                />
                <Main />
            </Box>
        </>
    );
}
export default Home;
