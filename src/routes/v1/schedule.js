const router = require("express").Router();
const { controllers: scheduleController } = require("@/src/api/schedule");

// const authenticate = require("../middleware/authenticate");
// const authorize = require("../middleware/authorize");
// const ownership = require('../middleware/ownership');

// //* : GET ALL TRAINING BY DOCTOR
router.post("/", scheduleController.createNewItem);

router.get("/", scheduleController.getAllItems);

router.get("/:id", scheduleController.getItemById);

router.put("/:id", scheduleController.updateItemById);

router.delete("/:id", scheduleController.deleteItemById);

module.exports = router;
