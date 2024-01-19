import express from "express";
import {
  getAllBlogs,
  addBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
  getUserBlogs
} from "../controllers/blog-controller.js";

import  requireAuth  from "../middleware/requireAuth.js";

const blogRouter = express.Router();



blogRouter.get("/", getAllBlogs);

blogRouter.use(requireAuth);

blogRouter.get("/user", getUserBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getBlogById);
blogRouter.delete("/:id", deleteBlog);


export default blogRouter;
