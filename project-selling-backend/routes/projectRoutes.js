import express from "express";
import {
  getProjects,
  addProject,
  updateProject,   // 👈 MUST exist
  deleteProject,
  updateStatus,
} from "../controllers/projectController.js";
import upload from "../middlewares/uploadVideo.js";

const router = express.Router();

router.get("/", getProjects);

router.post("/", upload.single("video"), addProject);

// ✅ THIS ROUTE WAS MISSING
router.put("/:id", upload.single("video"), updateProject);

router.patch("/:id/status", updateStatus);

router.delete("/:id", deleteProject);

export default router;
