import express from "express"
import { CreatePost } from "../Controller/createPost";


const router = express.Router();



router.post("/create-post", CreatePost)

export default router