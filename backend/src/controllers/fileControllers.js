import prisma from "../config/database.js";
import * as fileServices from "../services/fileServices.js";
import fs from "fs";
import { errorResponse, successResponse } from "../utils/response.js";

export const uploadFile = async (req, res) => {
  try {
    const newFile = await fileServices.uploadFile(req, res);
    return successResponse(res, 201, "File berhasil diupload", newFile);
  } catch (err) {
    return errorResponse(res, 500, "Gagal mengupload file", err.message);
  }
};

export const deleteFile = async (req, res) => {
  try {
    const deletedFile = await fileServices.deleteFile(req, res);
    return successResponse(res, 200, "File berhasil dihapus", deletedFile);
  } catch (err) {
    const status = err?.status || 500;
    return errorResponse(res, status, "Gagal menghapus file", err.message);
  }
};
