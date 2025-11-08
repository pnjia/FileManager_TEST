import express from "express";
import {
  createFolder,
  deleteFolder,
  getFolderContentById,
  getFolders,
  renameFolder,
} from "../controllers/folderControllers.js";
import { validateInputMiddleware } from "../middlewares/validator.js";
import { folderValidation } from "../validation/folderValidation.js";

const router = express.Router();

router.get("/", getFolders);
router.get("/:id", getFolderContentById);
router.post("/", folderValidation, validateInputMiddleware, createFolder);
router.put("/:id", folderValidation, validateInputMiddleware, renameFolder);
router.delete("/:id", deleteFolder);

export default router;
