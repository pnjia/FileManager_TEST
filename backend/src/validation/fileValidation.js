import { body } from "express-validator";

export const fileValidation = [
  body("name").notEmpty().withMessage("Nama file harus diisi.").trim(),
];
