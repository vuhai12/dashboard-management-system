import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Revenue = sequelize.define(
  "Revenue",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: true,
    },

    posRevenue: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
      field: "pos_revenue",
    },

    eatclubRevenue: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
      field: "eatclub_revenue",
    },

    labourCosts: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
      field: "labour_costs",
    },

    directRevenue: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
      field: "direct_revenue",
    },

    totalCovers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "total_covers",
      validate: {
        min: 0,
      },
    },
  },
  {
    tableName: "revenues",
    timestamps: true,
    underscored: true,
  },
);

export default Revenue;
