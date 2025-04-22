import  { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext/authContext";
import ProductContext from "../context/productContext/productContext";
import { toast } from "react-toastify";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(5),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const { setSearchQuery } = useContext(ProductContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    console.log(e.target.value);
    
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlelogout = () => {
    setAnchorEl(null);
    localStorage.removeItem("auth");
    setAuth({
      user: null,
      token: "",
    });
    navigate("/");
    toast.success("Logout Successfull");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Book Store
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleSearchChange}
          />
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton color="inherit" component={Link} to="/">
            <HomeIcon />
          </IconButton>
          {auth?.user?.role !== 1 && (
            <IconButton color="inherit" component={Link} to="/cart">
              <ShoppingCartIcon />
            </IconButton>
          )}

          {auth?.user ? (
            <>
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
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
            </>
          ) : (
            <div>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </div>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
