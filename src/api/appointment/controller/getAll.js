const { Appointment } = require("@/src/model");


const getAll = async(req, res, next) => {

    const currentPage = (Number(req.query?.page) - 1) || 0
    const limit = Number(req.query?.limit) || 10

    const data = await Appointment.findAll({offset: currentPage*limit, limit: limit})
    const count = await Appointment.count()

    return res.status(200).json({data:data, count: count})
}

module.exports = getAll