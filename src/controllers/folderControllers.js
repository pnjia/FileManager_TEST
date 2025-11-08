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

export const getFolderContentById = async (req, res) => {
  try {
    const { folder, files } = await folderServices.getFolderContentById(
      req,
      res
    );
    console.log(folder);
    console.log(files);
    return successResponse(res, 200, "Folder content berhasil diambil", {
      folder,
      files,
    });
  } catch (error) {
    return errorResponse(
      res,
      500,
      "Gagal mengambil content folder",
      error.message
    );
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

export const renameFolder = async (req, res) => {
  try {
    const folder = await folderServices.renameFolder(req, res);
    return successResponse(res, 200, "Folder berhasil diganti namanya", folder);
  } catch (error) {
    return errorResponse(
      res,
      500,
      "Gagal mengganti nama folder",
      error.message
    );
  }
};

export const deleteFolder = async (req, res) => {
  try {
    const result = await folderServices.deleteFolder(req, res);
    return successResponse(res, 200, "Folder berhasil dihapus", result);
  } catch (error) {
    return errorResponse(res, 500, "Gagal menghapus folder", error.message);
  }
};
