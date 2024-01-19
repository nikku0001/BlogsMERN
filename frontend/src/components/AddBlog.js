import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";

const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });

  const handleChange = (event) => {
    setInputs((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const token = localStorage.getItem('token');

  const sendRequest = async () =>{
      const response = await fetch("http://localhost:8000/api/blog/add",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer '+token,
        },
        body: JSON.stringify(inputs)
      })

      const res = await response.json();

      if(response.ok){
        return res;
      }else{
        alert(res.message);
        console.log(res.message);
      }
  }
 
  const handleSubmit = (event) => {
    event.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs"));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={2}
          borderColor="secondary.main"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={5}
          display="flex"
          flexDirection={"column"}
          width={"70%"}
        >
          <Typography
            fontWeight={"bold"}
            padding={3}
            color="gray"
            variant="h3"
            textAlign={"center"}
          >
            Create your Blog
          </Typography>
          <InputLabel sx={labelStyle}>Title</InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="normal"
            variant="outlined"
          />
          <InputLabel sx={labelStyle}>Content</InputLabel>
          <TextField
            name="content"
            onChange={handleChange}
            value={inputs.content}
            margin="normal"
            variant="outlined"
          />
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            Submit Blog
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
