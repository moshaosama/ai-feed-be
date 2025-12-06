import { PostModal } from "../Models/postSchema";
import dotenv from "dotenv";
dotenv.config();
import { pipeline } from '@xenova/transformers';

export class PostRepository {
    static embedder: ((text: string) => Promise<number[][]>) | null = null;

    static async initModel() {
        if (!this.embedder) {
            const pipe = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
            this.embedder = async (text: string) => {
                const output = await pipe(text, { pooling: 'mean', normalize: true });
                return output.tolist();
            };
        }
    }

    static async CreatePost(title: string, description: string) {
        try {
            await this.initModel();
            const [embeddingVector] = await this.embedder!(description);

            const post = await PostModal.create({
                title,
                description,
                embeddings: embeddingVector
            });

            return post;
        } catch (err) {
            console.error("Error creating post:", err);
            throw err;
        }
    }
}