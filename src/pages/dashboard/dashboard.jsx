import React, { useState } from "react";

import { Box, CssBaseline } from "@mui/material";
import pages from "../../layout/pages";
import { menuStore } from "../../store/store";
import { Provider } from "react-redux";

import Nav from "../../components/nav/nav";
import Aside from "../../components/aside/aside";
import Main from "../../layout/dashboardLayout/main";

function Home() {
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Provider store={menuStore}>
                <Nav pages={pages} />
                <Aside pages={pages} />
            </Provider>
            <Main />
        </Box>
    );
}
export default Home;
