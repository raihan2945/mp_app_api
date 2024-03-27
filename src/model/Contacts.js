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
    category_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "category_id",
    },

    first_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "first_name",
    },

    last_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "last_name",
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "email",
    },
    company: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "company",
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "dob",
    },
    phone: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "phone",
    },
    mobile: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "mobile",
    },
    address: {
      type: DataTypes.STRING(255),
      field: "address",
    },
    address_2: {
      type: DataTypes.STRING(255),
      field: "address_2",
    },
    tag: {
      type: DataTypes.TEXT,
      field: "tag",
    },
    division: {
      type: DataTypes.STRING(255),
      field: "division",
    },
    district: {
      type: DataTypes.STRING(255),
      field: "district",
    },
    upazila: {
      type: DataTypes.STRING(255),
      field: "upazila",
    },
    union: {
      type: DataTypes.TEXT,
      field: "union",
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
    tableName: "contacts",
    comment: "",
    indexes: [],
    createdAt: false,
    updatedAt: false,
  };
  const Contacts = sequelize.define("Contacts", attributes, options);
  return Contacts;
};
