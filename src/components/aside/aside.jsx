import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import menuToggle from "../menuToggle";

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

function Aside({ pages }) {
    const drawerWidth = "250px";
    const open = useSelector((state) => state.menuToggle.open);
    const dispatch = useDispatch();

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
                    to: "/dashboard/billing",
                },
                {
                    title: "Invoice",
                    to: "/dashboard/invoice",
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
            divider: true,
        },
        {
            icon: <ClipboardList />,
            title: "Docs",
            to: "/dashboard/docs",
        },
        {
            icon: <Collection />,
            title: "Components",
            to: "/dashboard/components",
        },
        {
            icon: <Support />,
            title: "Help",
            to: "/dashboard/help",
        },
    ];

    const drawer = (toolbar) => (
        <>
            <Toolbar>
                {!toolbar ? "" : <img src={logo} alt="" />}
            </Toolbar>
            <Menu items={MenuList} />
        </>
    );

    function Menu({ items }) {
        const createList = (items) => {
            let menu = [];
            items.map((menuItem, i) => {
                if (
                    Array.isArray(menuItem.items) &&
                    menuItem.items.length > 0
                ) {
                    menu.push(
                        <ExpandableMenuItem
                            config={menuItem}
                            divider={menuItem.hasOwnProperty("divider")}
                            key={i}
                        />
                    );
                } else {
                    menu.push(
                        <MenuItem
                            config={menuItem}
                            divider={menuItem.hasOwnProperty("divider")}
                            key={i}
                        />
                    );
                }
            });
            return menu.concat();
        };

        return <List className="aside__list">{createList(items)}</List>;
    }

    const ExpandableMenuItem = ({ config, divider }) => {
        const [open, setOpen] = useState(checkPage());

        function checkPage() {
            if (config.hasOwnProperty("items")) {
                let items = config.items;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].to == window.location.pathname) {
                        return true;
                    }
                }
            }
            return false;
        }
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
                {!divider ? "" : <Divider />}
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

    const MenuItem = ({ config, divider }) => {
        return (
            <Link to={config.to} className="aside__list__link">
                <ListItem
                    button
                    className="aside__list__item"
                    onClick={() => dispatch(menuToggle())}
                >
                    <ListItemBody config={config} />
                </ListItem>
                {!divider ? "" : <Divider />}
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
                open={open}
                onClose={() => dispatch(menuToggle())}
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
