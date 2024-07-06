const router = require("express").Router();
const { controller: appointmentController } = require("@/src/api/appointment");


router.get("/", appointmentController.createNew);



module.exports = router;