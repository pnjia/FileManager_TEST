import express from "express";
import { successResponse, errorResponse } from "../utils/response.js";
import upload from "../config/multer.js";
import { deleteFile, uploadFile } from "../controllers/fileControllers.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.delete("/:id", deleteFile);

export default router;
