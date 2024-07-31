const { LetterBox } = require("@/src/model");
const { Op } = require("sequelize");


const getAll = async (req, res, next) => {
  const currentPage = Number(req.query?.page) - 1 || 0;
  const limit = Number(req.query?.limit) || 10;
  const search = req.query?.search;
  const dateStart = req.query?.start;
  const dateEnd = req.query?.end;

  try {
    let data = await LetterBox.findAll({
      offset: currentPage * limit,
      limit: limit,
      order: [["created_at", "DESC"]],
    });

    let count = await LetterBox.count();

    if (search) {
      data = await LetterBox.findAll({
        offset: currentPage * limit,
        limit: limit,
        order: [["created_at", "DESC"]],
        where: {
          full_name: {
            [Op.like]: `%${search}%`,
          },
        },
      });

      count = await LetterBox.count({
        where: {
          full_name: {
            [Op.like]: `%${search}%`,
          },
        },
      });
    }

    // date picker range
    if (dateStart && dateEnd) {
      data = await LetterBox.findAll({
        offset: currentPage * limit,
        limit: limit,
        order: [["start", "ASC"]],
        where: {
          start: {
            [Op.between]: [
              new Date(dateStart),
              new Date(dateEnd + " 23:59:59"),
            ],
          },
        },
      });

      count = await LetterBox.count({
        where: {
          start: {
            [Op.between]: [
              new Date(dateStart),
              new Date(dateEnd + " 23:59:59"),
            ],
          },
        },
      });
    }

    // date picker range with search
    if (dateStart && dateEnd && search) {
      data = await LetterBox.findAll({
        offset: currentPage * limit,
        limit: limit,
        order: [["created_at", "DESC"]],
        where: {
          created_at: {
            [Op.between]: [
              new Date(dateStart),
              new Date(dateEnd + " 23:59:59"),
            ],
          },
          full_name: {
            [Op.like]: `%${search}%`,
          },
        },
      });

      count = await LetterBox.count({
        where: {
          created_at: {
            [Op.between]: [new Date(dateStart), new Date(dateEnd)],
          },
          full_name: {
            [Op.like]: `%${search}%`,
          },
        },
      });
    }

    return res.status(200).json({ data: data, count: count });
  } catch (error) {
    return res.status(400).json({ status: error.message });
  }
};

module.exports = getAll;
