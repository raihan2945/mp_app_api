const { Appointment } = require("@/src/model");


const updateItem = async(req, res, next) => {
    
    const data = await Appointment.findOne({ where: { id: req.params.id } })

    if(data === null) {
        return res.status(400).json({
            status: "No data found"
        })
    }

    const updateData = await Appointment.update({...req.body},{where: {id: req.params.id}})

    return res.status(200).json({
        status: 'Data has been updated'
    })
}

module.exports = updateItem