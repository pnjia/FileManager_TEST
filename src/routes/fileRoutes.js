import express from "express";

const router = express.Router();

// Define your folder-related routes here
router.get("/", (req, res) => {
  res.send("Folder route is working!");
});

export default router;
