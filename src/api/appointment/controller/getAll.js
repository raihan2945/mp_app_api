const { Appointment } = require("@/src/model");
const { Op } = require("sequelize");

const getAll = async (req, res, next) => {
  const currentPage = Number(req.query?.page) - 1 || 0;
  const limit = Number(req.query?.limit) || 10;
  const search = req.query?.search;
  const dateStart = req.query?.start;
  const dateEnd = req.query?.end;

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
          [Op.like]: `%${search}%`,
        },
      },
    });

    count = await Appointment.count({
      where: {
        full_name: {
          [Op.like]: `%${search}%`,
        },
      },
    });
  }

  // date picker range
  if (dateStart && dateEnd) {
    data = await Appointment.findAll({
      offset: currentPage * limit,
      limit: limit,
      where: {
        created_at: {
          [Op.between]: [new Date(dateStart), new Date(dateEnd)],
        },
      },
    });

    count = await Appointment.count({
      where: {
        created_at: {
          [Op.between]: [new Date(dateStart), new Date(dateEnd)],
        },
      },
    });
  }

  return res.status(200).json({ data: data, count: count });
};

module.exports = getAll;
