import "./App.css";
import Header from "./components/Header";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/authslice";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(authActions.login());
    }
  });

  

  return (
    <React.Fragment>
      <Header>
        <Header />
      </Header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/" element={<Blogs />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />
            </>
          )}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
