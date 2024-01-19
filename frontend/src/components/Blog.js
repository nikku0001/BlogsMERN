import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Avatar,
  CardContent,
  CardHeader,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import {
  DeleteForeverOutlined,
  ModeEditOutlineOutlined,
} from "@mui/icons-material";

const Blog = ({ title, content, userName, isUser, id }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleEdit = (event) => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    
    const response = await fetch(`http://localhost:8000/api/blog/${id}`,{
      method: 'DELETE',
      headers:{
         authorization: 'bearer '+ token,
      }
    })

    const res = await response.json();

    if(response.ok){
      return res;
    }else{
      alert(res.message);
      console.log(res.message);
    }
  };

  const handleDelete = () => {
    deleteRequest().then(() => navigate("/myblogs"));
  };

  return (
    <div>
      <Card
        sx={{
          width: "50%",
          margin: "auto",
          marginTop: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": { boxShadow: "10px 10px 20px #ccc" },
        }}
      >
        {isUser && (
          <Box display={"flex"}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineOutlined color="info" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverOutlined color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName && userName.charAt(0)}
            </Avatar>
          }
          title={title}
          subheader=""
        />
        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>{userName}</b> {": "}
            {content}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
