import Project from "../models/Project.js";

/* =====================================================
   GET ALL PROJECTS
===================================================== */
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(projects);
  } catch (err) {
    console.error("GET PROJECTS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

/* =====================================================
   ADD PROJECT
===================================================== */
export const addProject = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      description,
      techStack,
      price,
    } = req.body;

    // ✅ FIXED: use demoUrl everywhere
    const demoUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const project = await Project.create({
      title,
      shortDescription,
      description,
      techStack,
      price,
      demoUrl,
      status: "available",
    });

    res.status(201).json(project);
  } catch (err) {
    console.error("ADD PROJECT ERROR:", err);
    res.status(500).json({ message: "Add project failed" });
  }
};

/* =====================================================
   UPDATE PROJECT
===================================================== */
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ✅ Keep old video if new one not uploaded
    const demoUrl = req.file
      ? `/uploads/${req.file.filename}`
      : project.demoUrl;

    await project.update({
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      description: req.body.description,
      techStack: req.body.techStack,
      price: req.body.price,
      demoUrl,
    });

    res.json(project);
  } catch (err) {
    console.error("UPDATE PROJECT ERROR:", err);
    res.status(500).json({ message: "Update project failed" });
  }
};

/* =====================================================
   DELETE PROJECT
===================================================== */
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.destroy();
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("DELETE PROJECT ERROR:", err);
    res.status(500).json({ message: "Delete project failed" });
  }
};

/* =====================================================
   UPDATE PROJECT STATUS (AVAILABLE / SOLD)
===================================================== */
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.status = status;
    await project.save();

    res.json(project);
  } catch (err) {
    console.error("UPDATE STATUS ERROR:", err);
    res.status(500).json({ message: "Update status failed" });
  }
};
