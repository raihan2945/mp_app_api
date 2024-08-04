const { Appointment } = require("@/src/model");


const deleteItem = async(req, res, next) => {
    
    const data = await Appointment.findOne({ where: { id: req.params.id } })

    if(data === null) {
        return res.status(400).json({
            status: "No data found for delele"
        })
    }

    const _del = await Appointment.destroy({where: {id: req.params.id}})

    return res.status(204).json({
        status: "Successfully deleted"
    })
}

module.exports = deleteItem