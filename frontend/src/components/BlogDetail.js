import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";

const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
function BlogDetail() {
  const navigate = useNavigate();
  const id = useParams().id;
  const token = localStorage.getItem('token');

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    setInputs((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const fetchDetails = async () => {
    const response = await fetch(`http://localhost:8000/api/blog/${id}`,{
      headers:{
        authorization: 'Bearer '+token,
      }
    })
    const res = await response.json();

    if(response.ok){
      setInputs({
        title: res.blog.title,
        content: res.blog.content,
      });
    }else{
      alert(res.message);
      console.log(res.message);
    }
  };
  
  useEffect(() => {
    fetchDetails();
  },[id]);


  const handleSubmit = (event) => {
    event.preventDefault();
    sendRequest()
      .then((data) => console.log(data))  
      .then(() => navigate("/myBlogs"));
  };

  
  const sendRequest = async () => {

    const response = await fetch(`http://localhost:8000/api/blog/update/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer '+token,
      },
      body: JSON.stringify(inputs),
    })
    const res = await response.json();

    if(response.ok){
      return res;
    }else{
      alert(res.message);
      console.log(res.message);
    }
  };

  return (
    <div>
      {inputs && (
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
              Edit your Blog
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
              Edit Blog
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
}

export default BlogDetail;
