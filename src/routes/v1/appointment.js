const router = require("express").Router();
const { controller: appointmentController } = require("@/src/api/appointment");


router.post("/", appointmentController.createNew);
router.get("/", appointmentController.getAll);
router.delete("/:id", appointmentController.deleteItem);
router.patch("/:id", appointmentController.updateItem);



module.exports = router;