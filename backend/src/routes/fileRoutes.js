import express from "express";
import upload from "../config/multer.js";
import {
  deleteFile,
  uploadFile,
  renameFile,
} from "../controllers/fileControllers.js";
import { fileValidation } from "../validation/fileValidation.js";
import { validateInputMiddleware } from "../middlewares/validator.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.put("/rename/:id", fileValidation, validateInputMiddleware, renameFile);
router.delete("/:id", deleteFile);

export default router;
