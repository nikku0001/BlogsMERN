import React, { useEffect, useState } from "react";
import Blog from "./Blog";

function Blogs() {


  const [blogs, setBlogs] = useState();

  const sendRequest = async () => {
    const response = await fetch('http://localhost:8000/api/blog');

    const res = await response.json();

    if(response.ok){
      return res;
    }else{
      alert(res.message);
      console.log(res.message);
    }
    
  };

  useEffect(() => {
    sendRequest().then((data) => {
      if(data){
        setBlogs(data.blogs);
      }
    });
  }, []);
 
  return (
    <div>
      {blogs &&
        blogs.map((blog) => (
          <Blog
            id={blog._id}
            isUser = { false }
            title={blog.title}
            content={blog.content}
            userName={blog.author}
          />
        ))}
    </div>
  );
}

export default Blogs;
