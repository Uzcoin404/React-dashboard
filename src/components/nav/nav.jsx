import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";

import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Badge,
    MenuItem,
    Menu,
    Avatar,
    Tooltip,
    TextField,
    InputAdornment,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import logo from "../../assets/img/logo.png";
import userAvatar from "../../assets/img/avatar.png";

import "./nav.scss";

function Nav({ MenuToggle, pages, isHaveSearch = true }) {
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const settings = ["My profile", "Account", "Dashboard", "Log out"];

    return (
        <AppBar
            position="static"
            className="nav"
            sx={{
                backgroundColor: "#fff",
                boxShadow: "none",
                borderBottom: "1px solid #E5E7EB",
            }}
        >
            <Toolbar>
                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{ mr: 4, display: { xs: "none", md: "block" } }}>
                        <Link to="/">
                            <img src={logo} alt="Logo" />
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={MenuToggle}
                            color="inherit"
                        >
                            <MenuIcon sx={{ color: "#111827" }} />
                        </IconButton>
                    </Box>
                    {isHaveSearch ? (
                        <TextField
                            placeholder="Search"
                            type="search"
                            variant="outlined"
                            size="small"
                            className="nav__search"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                style: {
                                    height: "45px",
                                    backgroundColor: "#F9FAFB",
                                    borderRadius: "16px",
                                },
                            }}
                            sx={{
                                height: "45px",
                                "& fieldset": {
                                    borderRadius: "16px",
                                    borderColor: "#E5E7EB",
                                },
                                "& .MuiOutlinedInput-root:hover fieldset": {
                                    borderColor: "#E5E7EB",
                                },
                                "& .MuiOutlinedInput-root.Mui-focused fieldset":
                                    {
                                        borderColor: "#1976d2",
                                    },
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            {pages.map((page) => (
                                <Link
                                    to={page.to}
                                    key={page.to}
                                    className="nav__link"
                                >
                                    {page.title}
                                </Link>
                            ))}
                        </Box>
                    )}
                </Box>

                <Box sx={{ flexGrow: 1 }} />
                <Box>
                    <IconButton size="large">
                        <Badge badgeContent={17} color="error">
                            <NotificationsIcon sx={{ color: "#111827" }} />
                        </Badge>
                    </IconButton>
                </Box>
                <Box sx={{ flexGrow: 0, ml: 2 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="" src={userAvatar} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem
                                key={setting}
                                onClick={handleCloseUserMenu}
                            >
                                <Typography textAlign="center">
                                    {setting}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default Nav;
