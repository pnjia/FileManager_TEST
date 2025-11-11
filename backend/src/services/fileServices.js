import prisma from "../config/database.js";
import fs from "fs";

export const uploadFile = async (req, res) => {
  const { folderId } = req.body;
  console.log({ folderId });
  const file = req.file;
  console.log({ filePath: file.path });
  const newFile = await prisma.file.create({
    data: {
      folderId: Number(folderId),
      filename: file.filename,
      displayName: file.originalname,
      mime: file.mimetype,
      size: file.size,
      storagePath: `/images/${file.filename}`,
      thumbnailPath: `/images/${file.filename}`,
    },
  });
  return newFile;
};

export const deleteFile = async (req, res) => {
  const { id } = req.params;
  const file = await prisma.file.findUnique({ where: { id: Number(id) } });
  if (!file) {
    const err = new Error("File not found");
    err.status = 404;
    throw err;
  }

  try {
    if (fs.existsSync(file.storagePath)) {
      fs.unlinkSync(file.storagePath);
    }
  } catch (fsErr) {
    const err = new Error(
      `Gagal menghapus file pada storage lokal: ${fsErr.message}`
    );
    err.status = 500;
    throw err;
  }

  const deleted = await prisma.file.delete({ where: { id: Number(id) } });
  return deleted;
};

export const renameFile = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const file = await prisma.file.findUnique({ where: { id: Number(id) } });
  if (!file) {
    const err = new Error("File tidak ditemukan");
    err.status = 404;
    throw err;
  }

  const updatedFile = await prisma.file.update({
    where: { id: file.id },
    data: { displayName: name },
  });

  return updatedFile;
};
