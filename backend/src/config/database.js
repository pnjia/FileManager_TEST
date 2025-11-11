import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

try {
  await prisma.$connect();
  console.log("Berhasil terhubung ke database");
} catch (error) {
  console.log("Gagal terhubung ke database:", error);
}

export default prisma;
