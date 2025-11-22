
import express from "express";
import dotenv from "dotenv";
import { ConnectDb } from "./Utils/database";
import PostRouter from "./Modules/Posts/Router/postRouter"

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.use("/api/v1/posts", PostRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`);
    ConnectDb()
});
