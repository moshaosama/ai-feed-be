
import { Request, Response } from 'express';
import { PostRepository } from '../Repository/postRepository';
import { PostModal } from '../Models/postSchema';
export const SearchPosts = async (req: Request, res: Response) => {
    try {
        const query = req.query.q as string; // النص اللي المستخدم عايز يدور عليه
        const topK = parseInt(req.query.topK as string) || 5; // عدد النتائج

        if (!query) {
            return res.status(400).json({
                statusbar: "error",
                message: "Query parameter 'q' is required"
            });
        }

        await PostRepository.initModel();
        const [queryEmbedding] = await PostRepository.embedder!(query);

        const posts = await PostModal.find();

        // Cosine similarity
        const similarity = (vecA: number[], vecB: number[]) => {
            const dot = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
            const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
            const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
            return dot / (normA * normB);
        };

        const ranked = posts
            .map(post => ({
                post,
                score: similarity(queryEmbedding, post.embeddings)
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, topK);

        return res.status(200).json({
            statusbar: "success",
            data: ranked.map(r => r.post)
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            statusbar: "error",
            message: "Internal Server Error"
        });
    }
};