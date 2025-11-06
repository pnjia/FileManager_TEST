import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";

const app = express();
const PORT = 4000;

const prisma = new PrismaClient();

await prisma
  .$connect()
  .then(() => {
    console.log("Berhasil terhubung ke database");
  })
  .catch((error) => {
    console.error("Gagal terhubung ke database:", error);
  });

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
