const { Appointment } = require("@/src/model");


const createNew = async(req, res, next) => {
    const data = req.body

    if(data.full_name == null) {
       return res.status(400).json({
            status: 'Full name is required'
        })
    }

    if(data.mobile == null) {
        return res.status(400).json({
             status: 'Mobile number is required'
         })
    }

    const appointment = await Appointment.create({...data})
    
    return res.status(200).json(appointment);
}

module.exports = createNew