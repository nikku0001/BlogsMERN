import React, { useState,useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authslice";


function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);


  const location = useLocation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line
    switch (location.pathname) {
      case "/":
        setValue(0);
        break;
      case "/myBlogs":
        setValue(1);
        break;
      case "/blogs/add":
        setValue(2);
        break;
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };





  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(90deg, rgba(240,13,205,1) 0%, rgba(0,212,255,1) 100%)",
      }}
    >
      <Toolbar>
        <Typography
          component={Link}
          to="/"
          variant="h4"
          style={{ textDecoration: "none" }}
        >
          Blog Site
        </Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"}>
            <Tabs
              textColor="inherit"
              value={value}
              onChange={handleChange}
            >
              <Tab LinkComponent={Link} to="/" label="All Blogs" value={0}/>
              <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs " value={1} />
              <Tab LinkComponent={Link} to="/blogs/add" label="Create Blogs " value={2} />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="/Signin"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
              >
                Sign In
              </Button>
              <Button
                LinkComponent={Link}
                to="/Signup"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
              >
                Sign Up
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
            >
              Log Out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
