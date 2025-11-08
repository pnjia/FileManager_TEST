import prisma from "../config/database.js";

export const updateChildPaths = async (folderId, oldBase, newBase) => {
  const subfolders = await prisma.folder.findMany({
    where: { parentId: folderId },
  });
  for (const sub of subfolders) {
    const newSubPath = sub.path.replace(oldBase, newBase);
    await prisma.folder.update({
      where: { id: sub.id },
      data: { path: newSubPath },
    });

    await updateChildPaths(sub.id, sub.path, newSubPath);
  }
};
