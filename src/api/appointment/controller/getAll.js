const { Appointment } = require("@/src/model");
const { Op } = require("sequelize");

const getAll = async (req, res, next) => {
  const currentPage = Number(req.query?.page) - 1 || 0;
  const limit = Number(req.query?.limit) || 10;
  const search = req.query?.search;

  let data = await Appointment.findAll({
    offset: currentPage * limit,
    limit: limit,
  });

  let count = await Appointment.count();

  if (search) {
    data = await Appointment.findAll({
      offset: currentPage * limit,
      limit: limit,
      where: {
        full_name: {
            [Op.like]: `%${search}%`
        },
      },
    });

    count = await Appointment.count({
        where: {
            full_name: {
                [Op.like]: `%${search}%`
            },
          },
    });
  }

  return res.status(200).json({ data: data, count: count });
};

module.exports = getAll;
