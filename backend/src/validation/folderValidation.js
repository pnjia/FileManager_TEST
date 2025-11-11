import { body } from "express-validator";

export const folderValidation = [
  body("name").notEmpty().withMessage("Nama folder harus diisi.").trim(),
];
