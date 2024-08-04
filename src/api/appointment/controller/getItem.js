const { Appointment } = require("@/src/model");


const getItem = async(req, res, next) => {
    
    const data = await Appointment.findOne({ where: { id: req.params.id } })

    if(data === null) {
        return res.status(400).json({
            status: "No data found"
        })
    }
    
    return res.status(200).json(data)
}

module.exports = getItem