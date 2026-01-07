import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Project = sequelize.define("Project", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  shortDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  techStack: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  demoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("available", "sold"),
    defaultValue: "available",
  },
});

export default Project;
