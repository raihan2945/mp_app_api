const router = require("express").Router();
const { controllers: trainingController } = require("@/src/api/v1/training");

// const authenticate = require("../middleware/authenticate");
// const authorize = require("../middleware/authorize");
// const ownership = require('../middleware/ownership');


// //* : GET ALL TRAINING BY DOCTOR
router.get("/doctor/:id", trainingController.getAllTrainingsByDoctor);

//* : CREATE A TRAINING TO DOCTOR
router.post("/doctor", trainingController.createDoctorTraining);

//* : UPDATE A DOCTOR TRAINING
router.patch("/doctor/:id", trainingController.updateDoctorTraining);

// //* : DELETE A DOCTOR TRAINING
router.delete("/doctor/:id", trainingController.deleteDcoctorTraining);


module.exports = router;
