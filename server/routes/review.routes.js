import express from "express";
import multer from "multer";
import { submitReview } from "../controller/review.controller.js";
const router = express.Router();
const upload = multer();

router.post("/review", upload.single("image"), submitReview);

export default router;