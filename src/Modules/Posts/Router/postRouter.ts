import express from "express"
import { CreatePost } from "../Controller/createPost";
import { SearchPosts } from "../Controller/searchPost";


const router = express.Router();



router.post("/create-post", CreatePost)
router.get("/search", SearchPosts);

export default router