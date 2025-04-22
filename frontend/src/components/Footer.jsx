import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Menu,
  Box,
  MenuItem,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../context/authContext/authContext";

const Footer = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlelogout = () => {
    localStorage.removeItem("auth");
    setAuth({
      user: null,
      token: "",
    });
    toast.success("Logout Successfull");
    navigate("/")
  };

  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <BottomNavigation sx={{ width: "100%" }}>
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            component={Link}
            to="/"
          />
          {auth?.user ? (
            <div>
              <BottomNavigationAction
                label="Profile"
                icon={<AccountCircleIcon />}
                onClick={handleClick}
              />
              {auth?.user?.role !== 1 && (
                <BottomNavigationAction
                  label="Cart"
                  icon={<ShoppingCartIcon />}
                  component={Link}
                  to="/cart"
                />
              )}
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {auth.user.role === 1 ? (
                  <div>
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/dashboard"
                    >
                      Dashboard
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/createproduct"
                    >
                      Create Product
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/userorder"
                    >
                      User Orders
                    </MenuItem>
                  </div>
                ) : (
                  <MenuItem onClick={handleClose} component={Link} to="/order">
                    My Orders
                  </MenuItem>
                )}

                <MenuItem onClick={handlelogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Box sx={{ display: "flex" }}>
              <Button color="primary" component={Link} to="/login">
                Login
              </Button>
              <Button color="primary" component={Link} to="/signup">
                Signup
              </Button>
            </Box>
          )}
        </BottomNavigation>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
