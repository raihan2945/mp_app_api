const router = require("express").Router();
const { controllers: categoryController } = require("@/src/api/category");

// const authenticate = require("../middleware/authenticate");
// const authorize = require("../middleware/authorize");
// const ownership = require('../middleware/ownership');

// //* : GET ALL TRAINING BY DOCTOR
router.post("/", categoryController.createNewItem);

router.get("/", categoryController.getAllItems);

router.get("/:id", categoryController.getItemById);

router.put("/:id", categoryController.updateItemById);

router.delete("/:id", categoryController.deleteItemById);

module.exports = router;
