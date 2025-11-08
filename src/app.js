import express from "express";
import folderRoutes from "./routes/folderRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/folders", folderRoutes);
app.use("/api/files", fileRoutes);

export default app;
