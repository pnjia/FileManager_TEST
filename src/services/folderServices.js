import prisma from "../config/database.js";

export const getFolders = async (req, res) => {
  const folders = await prisma.folder.findMany();
  return folders;
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
