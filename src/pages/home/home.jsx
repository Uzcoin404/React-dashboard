import React, { useState } from "react";

import Nav from "../../components/nav/nav";
import Aside from "../../components/aside/aside";

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
            <Aside
                mobileOpen={mobileOpen}
                MenuToggle={MenuToggle}
                pages={pages}
            />
        </>
    );
}
export default Home;
