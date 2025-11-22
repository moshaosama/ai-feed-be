import OpenAI from "openai";
import { PostModal } from "../Models/postSchema";
import dotenv from "dotenv";
dotenv.config();



export  class PostRepository {
    static async CreatePost (title: string , description: string) {
        try {

        const response = await fetch("https://api.groq.com/openai/v1/embeddings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GROQ_KEY}`
        },
        body: JSON.stringify({
            model: "embedding-text-3-small",
            input: description
        })
        });

        const data = await response.json();
        // const embeddingVector = data.data[0].embedding;

    //   const post = (await PostModal.create({ title, description,embeddings:embeddingVector})).save();
    //   return post;

    console.log(data);
    
    } catch (err) {
      console.error("Error creating post:", err);
      throw err;
    }
    }
}