const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id",
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "name",
    },

    details: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "details",
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "date",
    },
    time: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "time",
    },
    remind_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "remind_time",
    },
    schedule_type: {
      type: DataTypes.ENUM("event", "task"),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "schedule_type",
    },
    
    notes: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "notes",
    },
    status: {
      type: DataTypes.ENUM("active", "paused"),
      allowNull: true,
      defaultValue: "active",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "status",
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "created_at",
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal("NULL"),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "updated_at",
    },
  };
  const options = {
    tableName: "schedules",
    comment: "",
    indexes: [],
    createdAt: false,
    updatedAt: false,
  };
  const Schedules = sequelize.define("Schedules", attributes, options);
  return Schedules;
};
