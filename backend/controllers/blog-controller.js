import Blog from "../model/Blog.js";
import User from "../model/User.js";

export const getAllBlogs = async (req, res, next) => {
  let blogs;

  try {
    blogs = await Blog.find().sort({ updatedAt: -1});
  } catch (error) {
    console.log(error);
  }
  // if (!blogs) {
  //   return res.status(404).json({ message: "No Blog Found!" });
  // }
  return res.status(200).json({ blogs });
};

export const addBlog = async (req, res, next) => {
  const { title, content } = req.body;
  const userId = req.user;

  let existingUser,author;
  try {
    existingUser = await User.findById(userId);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to Find user by this Id" });
  }else{
    author = existingUser.name;
  }

  const blog = new Blog({
    title,
    content,
    userId,
    author,
  });
  try {
    await blog.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
  
  return res.status(200).json({ blog });
};

export const updateBlog = async (req, res, next) => {
  const { title, content } = req.body;

  const blogId = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      content,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update Blog" });
  }
  return res.status(200).json({ blog });
};

export const getBlogById = async (req, res, next) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(404).json({ message: "No blog found!" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  let blog;
  try {
    blog = await Blog.findById(req.params.id);
  } catch (err) {
    console.log(err);
  }
  if(blog && blog.userId.equals(req.user._id)){
    blog = await Blog.findByIdAndDelete(req.params.id)
  }else{
    return res.status(401).json({ message: "not authorized to delete"});
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Delete" });
};

export const getUserBlogs = async (req, res, next) => {

  let userBlogs;

  try {
    userBlogs = await Blog.find({'userId': req.user}).sort({ updatedAt: -1});
  } catch (error) {
    console.log(error);
  }
 
  if (!userBlogs) {
    return res.status(400).json({ message: "No blogs found!" });
  }
  return res.status(200).json({ userBlogs });
};
