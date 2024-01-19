import React, { useEffect, useState } from "react";

import Blog from "./Blog";

function UserBlogs() {
  const [userBlogs, setUserBlogs] = useState();
  const token = localStorage.getItem('token');

  const sendRequest = async () => {
    const response = await fetch("http://localhost:8000/api/blog/user",{
      headers:{
        'authorization': 'bearer ' + token,
      }
    });
    
    const res = await response.json();

    if(response.ok){
      return res;
    }else{
      alert(res.message);
      console.log(res.message);
    }
  };

  useEffect(() => {
    sendRequest().then((data) => setUserBlogs(data.userBlogs));
  },[userBlogs]);


  return (
    <div>
      {" "}
      {userBlogs &&
        userBlogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            content={blog.content}
            userName={blog.author}
          />
        ))}
    </div>
  );
}

export default UserBlogs;
