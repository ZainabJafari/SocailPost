import express from "express";
import {
    getComment,
    addComment,
} from "../controllers/comments.js";

const router = express.Router();

router.get("/", getComment);
router.post("/", addComment);

export default router