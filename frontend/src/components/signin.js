import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authslice";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });



  const handleChange = (event) => {
    setInputs((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const sendRequest = async () => {
    const response = await fetch(`http://localhost:8000/api/user/signin`,{
          method : 'POST',
          headers : {
            'Content-Type': 'application/json',
          },
          body : JSON.stringify(inputs)
    });
    const res = await response.json();

    if(response.ok){
      return res;
    }else{
      alert(res.message);
      console.log(res.message);
    }

  };

  const handleSubmit = (event) => {
    event.preventDefault();

    sendRequest()
    .then((data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.existingUser.name);
    })
    .then(() => {
          dispatch(authActions.login());
          console.log('action dispatched');
    })
    .then(() => {
      navigate("/");
    })
    //.then((data) => console.log(data.token));
   
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
    
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={10}
        >

          <Typography variant="h3" padding={3} textAlign="center">
            Sign In
          </Typography>

          <TextField
            name="email"
            onChange={handleChange}
            type={"email"}
            value={inputs.email}
            placeholder="Email"
            margin="normal"
          />

          <TextField
            name="password"
            onChange={handleChange}
            type={"password"}
            value={inputs.password}
            placeholder="Password"
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            Signin
          </Button>

          <Button
            onClick={() => navigate("/signup")}
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 2 }}
            color="warning"
          >
            New User? Register Now
          </Button>

        </Box>
      </form>
    </div>
  );
};

export default Signin;
