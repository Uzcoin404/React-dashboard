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

import {
    ChartPie,
    DocumentReport,
    ShoppingBag,
    Inbox,
    LockClosed,
    ClipboardList,
    Collection,
    Support,
} from "../../lib/icons/Icons";
import "./aside.scss";
import logo from "../../assets/img/logo.png";

function Aside({ mobileOpen, pages, MenuToggle }) {
    const drawerWidth = "250px";

    const MenuList = [
        {
            icon: <ChartPie />,
            title: "Overview",
            to: "/",
        },
        {
            icon: <DocumentReport />,
            title: "Pages",
            items: pages,
        },
        {
            icon: <ShoppingBag />,
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
                    title: "Billing",
                    to: "/billing",
                },
                {
                    title: "Invoice",
                    to: "/invoice",
                },
            ],
        },
        {
            icon: <Inbox />,
            title: "Messages",
            to: "/inbox",
        },
        {
            icon: <LockClosed />,
            title: "Authentication",
            to: "/auth",
        },
        {
            icon: <ClipboardList />,
            title: "Docs",
            to: "/home/tables",
        },
        {
            icon: <Collection />,
            title: "Components",
            to: "/components",
        },
        {
            icon: <Support />,
            title: "Help",
            to: "/help",
        },
    ];

    const drawer = (toolbar) => (
        <>
            <Toolbar>{!toolbar ? "" : <img src={logo} alt="" />}</Toolbar>
            <Menu items={MenuList} />
            <Divider />
        </>
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
                    className="aside__list__item expandable__list"
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
                <ListItemIcon
                    sx={{ minWidth: "40px" }}
                    className="aside__list__icon"
                >
                    {config.icon}
                </ListItemIcon>
                <ListItemText
                    primary={config.title}
                    className="aside__list__text"
                />
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
        <Box component="nav" sx={{ flexShrink: { sm: 0 } }} className="aside">
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    display: { xs: "none", md: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                        zIndex: (theme) => theme.zIndex.drawer - 101,
                    },
                }}
                open
            >
                <Box className="aside__content">{drawer()}</Box>
            </Drawer>
            <Drawer
                variant="temporary"
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
                {drawer(true)}
            </Drawer>
        </Box>
    );
}
export default Aside;
