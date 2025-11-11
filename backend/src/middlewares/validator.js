import { validationResult } from "express-validator";
import { errorResponse } from "../utils/response.js";

export const validateInputMiddleware = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(
        res,
        400,
        "Validasi error",
        errors.array().map((err) => ({
          field: err.path,
          message: err.msg,
        }))
      );
    }
    next();
  } catch (error) {
    return errorResponse(
      res,
      500,
      "Terjadi kesalahan pada server",
      error.message
    );
  }
};
