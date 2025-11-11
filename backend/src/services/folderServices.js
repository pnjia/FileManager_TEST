import prisma from "../config/database.js";
import path from "path";
import fs from "fs";
import { updateChildPaths } from "../helpers/updateChildPath.js";

export const getFolders = async (req, res) => {
  const folders = await prisma.folder.findMany();
  return folders;
};

export const getFolderContentById = async (req, res) => {
  const { id } = req.params;

  const folder = await prisma.folder.findUnique({ where: { id: Number(id) } });
  const files = await prisma.file.findMany({ where: { folderId: Number(id) } });

  return { folder, files };
};

export const createFolder = async (req, res) => {
  const { name, parentId } = req.body;

  const parentFolder = parentId
    ? await prisma.folder.findUnique({ where: { id: parentId } })
    : null;

  const path = parentFolder ? `${parentFolder.path}/${name}` : `/${name}`;

  const folder = await prisma.folder.create({
    data: { name, parentId: parentId ? Number(parentId) : null, path },
  });

  return folder;
};

export const renameFolder = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const folder = await prisma.folder.findUnique({ where: { id: Number(id) } });
  if (!folder) {
    const err = new Error("Folder not found");
    err.status = 404;
    throw err;
  }

  const oldPath = folder.path;

  const parentFolder = folder.parentId
    ? await prisma.folder.findUnique({ where: { id: folder.parentId } })
    : null;

  const newPath = parentFolder
    ? path.join(parentFolder.path, name)
    : path.join(path.parse(oldPath).root, name);

  const updatedFolder = await prisma.folder.update({
    where: { id: folder.id },
    data: { name: name, path: newPath },
  });

  await updateChildPaths(folder.id, oldPath, newPath);

  return updatedFolder;
};

export const deleteFolder = async (req, res) => {
  const { id } = req.params;
  const folder = await prisma.folder.findUnique({ where: { id: Number(id) } });
  if (!folder) {
    const err = new Error("Folder not found");
    err.status = 404;
    throw err;
  }

  const deleted = await prisma.folder.delete({ where: { id: Number(id) } });
  return deleted;
};
