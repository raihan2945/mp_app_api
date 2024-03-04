const { Contacts, sequelize } = require("@/src/model");
const { badRequest, serverError, notFound } = require("@/src/utils/error");

//*: CREATE NEW
const createNew = async (body) => {
  const user = await Contacts.create(body)
    .then((user) => {
      return user.toJSON();
    })
    .catch((err) => {
      console.log("Error is : ", err);
      throw serverError("Server Error. Schedule isn't not created");
    });

  return user;
};

//*: GET ITEM BY ID
const findItemById = async (id) => {
  const user = await Contacts.findOne({ where: { id: id }, raw: true });

  if (!user) {
    throw notFound("Item not found");
  }

  return user;
};

//*: UPDATE ITEM BY ID
const updateItemById = async (id, bodyData) => {
  //? : Make update schema
  const newData = {};
  Object.keys(bodyData).forEach((key) => {
    newData[key] = bodyData[key] ?? newData[key];
  });

  const updatedData = await Contacts.findOne({ where: { id: id } })
    .then((data) => {
      if (!data) {
        throw notFound("Item not found");
      }

      //?: Update the user with the new data
      return data.update(newData);
    })
    .then((data) => {
      return data?.toJSON();
    })
    .catch((error) => {
      console.log("ITEM UPDATE ERROR : ", error);
      if (error.status === 404) {
        throw notFound("Item not found");
      } else {
        throw serverError("Items not updated");
      }
    });

  return updatedData;
};

//*: UPDATE ITEM BY ID
const deleteItemById = async (id, bodyData) => {
  const deletedItem = await Contacts.findOne({ where: { id: id } })
    .then(async (item) => {
      if (!item) {
        throw notFound("Item not found");
      }

      //? : Store deleteble item for return
      const return_item = item;

      //?: delete this chamber
      await item.destroy();

      //?: return deleted item
      return return_item;
    })
    .catch((error) => {
      if (error.status === 404) {
        throw notFound(error.message);
      }
    });

  return deletedItem ? deletedItem?.toJSON() : {};
};

//*: GET ALL ITEMS
const findAllItems = async (queries) => {
  let queryString = `SELECT * from contacts`;
  if (queries) {
    let validProperties = [];

    Object.keys(queries).map((key) => {
      if (queries[key]) {
        validProperties.push({
          [key]: queries[key],
        });
      }
    });

    validProperties.map((item, index) => {
      if (index == 0) {
        const key = Object.keys(item);
        queryString = queryString + ` WHERE ${key[0]} LIKE "%${item[key[0]]}%"`;
      } else {
        const key = Object.keys(item);
        queryString = queryString + ` AND ${key[0]} LIKE "%${item[key[0]]}%"`;
      }
    });

    console.log("valid properties are : ", validProperties);
  }

  const users = await sequelize.query(queryString);

  return users[0];
};

//* GET ALL USER TAGS
const getAllTags = async () => {
  const data = await sequelize.query(
    `SELECT DISTINCT tag from contacts GROUP BY tag`
  );

  return data[0];
};

module.exports = {
  createNew,
  findItemById,
  updateItemById,
  findAllItems,
  deleteItemById,
  getAllTags,
};
