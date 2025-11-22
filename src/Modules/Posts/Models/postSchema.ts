import mongoose from "mongoose";
import { VectorStores } from "openai/resources/index";



const PostScehma = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    embeddings:{
        type: [Number],
        required: true
    }
})



export const PostModal = mongoose.model("post", PostScehma);