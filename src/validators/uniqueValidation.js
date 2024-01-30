const { sequelize } = require("@/src/model");

//GET UNIQUE DATA
const getData = async (table, { name, unique }) => {
  const queryString = `SELECT * FROM ${table} WHERE ${name} = "${unique}"`;

  const data = await sequelize.query(queryString);
  const foundData = data ? data[0][0] : null;

  return foundData;
};

const getUniqueError = async (table, items = [], id) => {
  let errors = [];

  console.log("table name is : ", table);

  await Promise.all(
    items.map(async (item) => {
      if (!item.unique) {
        return;
      }

      const data = await getData(table, {
        name: item.name,
        unique: item.unique,
      });

    //   console.log("get data is : ", data);

      if (data) {
        if (data.id == id) {
          return;
        } else {
          errors = [...errors, { message: `${item.name} already exist` }];
        }
      }
    })
  );

  return errors.length > 0 ? errors : null;
};

module.exports = getUniqueError;
