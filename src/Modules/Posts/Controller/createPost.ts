import { Request, Response } from 'express';
import { PostRepository } from '../Repository/postRepository';

export const CreatePost = async (req: Request , res: Response) => {
    try {
        const {title , description} = req.body;

        if(!title && !description) {
            return res.status(400).json({
                statusbar: "error",
                message: "Bad Request"
            })
        }
        await PostRepository.CreatePost(title , description);

        return res.status(200).json({
            statusbar: "success",
            message: "Created Post Successfully"
        })
    }
    catch(err) {
         console.log(err);
        return res.status(500).json({
            statusbar: "error",
            message: "Internal Server Error"
        })
       
        
    }
}