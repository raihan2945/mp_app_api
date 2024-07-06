const { Appointment } = require("@/src/model");


const getAll = async(req, res, next) => {
    const data = await Appointment.findAll()

    return res.status(200).json(data)
}

module.exports = getAll