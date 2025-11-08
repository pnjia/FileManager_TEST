import * as folderServices from "../services/folderServices.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const getFolders = async (req, res) => {
  try {
    const folders = await folderServices.getFolders(req, res);
    return successResponse(res, 200, "Folders berhasil diambil", folders);
  } catch (error) {
    return errorResponse(res, 500, "Gagal mengambil folders", error.message);
  }
};

export const createFolder = async (req, res) => {
  try {
    const folder = await folderServices.createFolder(req, res);
    return successResponse(res, 201, "Folder berhasil dibuat", folder);
  } catch (error) {
    return errorResponse(res, 500, "Gagal membuat folder", error.message);
  }
};
