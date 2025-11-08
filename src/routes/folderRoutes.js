import express from "express";
import { createFolder, getFolders } from "../controllers/folderControllers.js";
import { validateInputMiddleware } from "../middlewares/validator.js";
import { folderValidation } from "../validation/folderValidation.js";

const router = express.Router();

router.get("/", getFolders);
router.post("/", folderValidation, validateInputMiddleware, createFolder);

export default router;
