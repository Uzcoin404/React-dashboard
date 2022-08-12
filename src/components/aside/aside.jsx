import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";

import {
    Drawer,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Toolbar,
    Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import { Inbox } from "../../lib/icons/Icons";
import "./aside.scss";

function Aside({ mobileOpen, pages, MenuToggle }) {
    const drawerWidth = "250px";

    const MenuList = [
        {
            icon: <Inbox />,
            title: "Overview",
            to: "/",
        },
        {
            icon: "",
            title: "Pages",
            items: pages
        },
        {
            icon: "",
            title: "Sales",
            items: [
                {
                    title: "Product List",
                    items: [
                        {
                            title: "Something1",
                            to: "/something1",
                        },
                        {
                            title: "Something2",
                            to: "/something2",
                        },
                    ],
                },
                {
                    title: 'Billing',
                    to: '/billing'
                },
                {
                    title: 'Invoice',
                    to: '/invoice'
                }
            ],
        },
        {
            icon: "",
            title: "Messages",
            to: "/inbox",
        },
        {
            icon: "",
            title: "Authentication",
            to: "/auth",
        },
        {
            icon: "",
            title: "Docs",
            to: "/docs",
        },
        {
            icon: "",
            title: "Components",
            to: "/components",
        },
        {
            icon: "",
            title: "Help",
            to: "/help",
        },
    ];

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <Menu items={MenuList} />
            <Divider />
        </div>
    );

    function Menu({ items }) {
        const createList = (items) => {
            let menu = [];
            items.map((menuItem) => {
                if (
                    Array.isArray(menuItem.items) &&
                    menuItem.items.length > 0
                ) {
                    menu.push(
                        <ExpandableMenuItem
                            config={menuItem}
                            key={menuItem.title}
                        />
                    );
                } else {
                    menu.push(
                        <MenuItem config={menuItem} key={menuItem.title} />
                    );
                }
            });
            return menu.concat();
        };

        return <List className="aside__list">{createList(items)}</List>;
    }

    const ExpandableMenuItem = ({ config }) => {
        const [open, setOpen] = useState(false);

        const handleClick = () => {
            setOpen(!open);
        };

        return (
            <div component="nav">
                <ListItem
                    button
                    onClick={handleClick}
                    className="aside__list__item"
                >
                    <ListItemBody config={config} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Menu items={config.items} />
                </Collapse>
            </div>
        );
    };

    const ListItemBody = ({ config }) => {
        return (
            <>
                <ListItemIcon sx={{ minWidth: "40px" }} className="aside__list__icon">
                    {config.icon}
                </ListItemIcon>
                <ListItemText primary={config.title}  className="aside__list__text"/>
            </>
        );
    };

    const MenuItem = ({ config }) => {
        return (
            <Link to={config.to} className="aside__list__link">
                <ListItem button className="aside__list__item">
                    <ListItemBody config={config} />
                </ListItem>
            </Link>
        );
    };

    return (
        <div className="aside">
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="persistant"
                    open={mobileOpen}
                    onClose={MenuToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", md: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                            zIndex: "-1",
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </div>
    );
}
export default Aside;
