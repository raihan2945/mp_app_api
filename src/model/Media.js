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
    folder_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "folder_id",
    },
    user_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "user_id",
    },

    slug: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "slug",
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

    type: {
      type: DataTypes.ENUM("docs", "image"),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "type",
    },

    status: {
      type: DataTypes.ENUM("active", "paused"),
      allowNull: true,
      defaultValue: null,
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
    tableName: "media",
    comment: "",
    indexes: [],
    createdAt: false,
    updatedAt: false,
  };
  const Media = sequelize.define("Media", attributes, options);
  return Media;
};
