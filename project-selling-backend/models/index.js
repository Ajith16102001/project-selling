import sequelize from "../config/database.js";
import Admin from "./Admin.js";
import Project from "./Project.js";

const db = {
  sequelize,
  Admin,
  Project,
};

export default db;
